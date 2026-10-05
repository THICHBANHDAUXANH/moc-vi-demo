(() => {
  'use strict';

  const trim = value => String(value ?? '').trim();
  const apiBaseUrl = () => trim(window.MOC_MIEN_API_BASE_URL).replace(/\/+$/, '');

  function buildOrderPayload({ cart, formData, catalog }) {
    const items = cart.map(item => {
      const sku = catalog?.[item.id]?.skus?.[item.size];
      if (!sku) throw new Error('Không tìm thấy mã SKU cho sản phẩm trong giỏ. Hãy tải lại trang và thử lại.');
      return {
        sku,
        quantity: item.quantity,
      };
    });

    return {
      items,
      customer: {
        name: trim(formData.get('customerName')),
        phone: trim(formData.get('customerPhone')),
        address: trim(formData.get('customerAddress')),
      },
      payment_method: formData.get('payment') === 'bank_transfer' ? 'bank_transfer' : 'cod',
      note: trim(formData.get('customerNote')),
    };
  }

  async function createOrder(payload) {
    const base = apiBaseUrl();
    if (!base) return { mode: 'manual', order: null };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch(base + '/api/orders', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      let body = null;
      try { body = await response.json(); } catch { body = null; }

      if (!response.ok) {
        const message = body?.message || body?.error || ('Không thể tạo đơn (HTTP ' + response.status + ').');
        throw new Error(message);
      }

      return { mode: 'api', order: body || {} };
    } catch (error) {
      if (error?.name === 'AbortError') throw new Error('Máy chủ phản hồi quá lâu. Vui lòng thử lại.');
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  function paymentHelp(method) {
    if (method === 'bank_transfer') {
      return apiBaseUrl()
        ? 'Sau khi tạo đơn, thông tin chuyển khoản hoặc mã QR sẽ được lấy an toàn từ máy chủ.'
        : 'Bản GitHub Pages chưa nối backend. Shop sẽ gửi thông tin chuyển khoản sau khi xác nhận đơn qua Zalo.';
    }
    return 'Bạn thanh toán khi nhận hàng. Phí vận chuyển được shop xác nhận trước khi gửi.';
  }

  window.MocMienCheckout = Object.freeze({
    apiBaseUrl,
    buildOrderPayload,
    createOrder,
    paymentHelp,
  });
})();
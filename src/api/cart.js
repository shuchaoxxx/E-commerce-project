import request from '@/utils/request'

/**
 * 获取新的商品信息
 * @param {String} skuId
 * @returns Promise
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

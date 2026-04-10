/**
 * @Date: 2023/2/7
 * @Desc:
 */
const IS_DEV = process.env.NODE_ENV === 'development';


// 正式环境 客服中心
const originMasterCsms = '//api-csms.costrip.cn';
// const originMasterCsms = '//api-csms.costrip.cn'
const ccsOrigin = '//api-ccs.costrip.cn';

const ossOriginAdmin = '//api-lleb-oss-admin.costrip.cn';
const ossOriginAdminOrder = `${ossOriginAdmin}/v1/order/`;
/**
 * 维修工单
 */
const originApiDrsAdmin = '//api-drs-admin.costrip.cn';
const origin = IS_DEV ? window.location.origin : originApiDrsAdmin;

export {
  IS_DEV,
  originMasterCsms,
  origin,
  ccsOrigin,
  ossOriginAdmin,
  ossOriginAdminOrder
};



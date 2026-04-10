import { useRef } from 'react';
import { ETable, useRequest } from '@cos-power/cos-power-pc-ui';


/**
 * 默认分页
 */
const PAGE_INDEX = 1;
/**
 * 默认每页数量 30
 */
const PAGE_SIZE = 30;

const defaultParams = { pageNum:PAGE_INDEX, pageSize:PAGE_SIZE };

interface IUsePageParams {
  Api: ( params: any ) => Promise<any>
  manual?: boolean,
  pageParams?: any,
  pageNumName?: 'pageNum' | 'pageIndex'
}


export default ({ pageParams = defaultParams, manual = true, Api, pageNumName = 'pageNum' } : IUsePageParams)=>{

  const [eTable] = ETable.useETable();

  /**
   * 实时查询参数
   */
  const fetchParams = useRef(pageParams);

  const { loading, data, run } = useRequest(
    () => Api(fetchParams.current),
    {
      manual,
    },
  );

  /**
   * 查询
   */
  const onSearch = (params:any)=>{
    eTable.setCurrent(1);
    fetchParams.current = { ...fetchParams.current, ...pageParams, ...params };
    run();
  };

  /**
   * 重置刷新列表
   */
  const refreshList = () => {
    fetchParams.current = pageParams;
    eTable.setCurrent(PAGE_INDEX);
    run();
  };

  /**
   * 表格内容
   */
  const tableProps = {
    eTable,
    loading,
    initPageSize: pageParams.pageSize,
    count: data?.data?.total,
    dataSource: data?.data?.list || [],
    onTablePageChange: (page:number)=>{
      fetchParams.current = { ...fetchParams.current, [pageNumName]: page };
      run();
    },
  };

  return {
    tableProps,
    onSearch,
    refreshList,
    fetchParams,
  };
};

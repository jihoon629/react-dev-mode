// application/client-react/src/pages/AdminManagement.js
// 또는 application/client-react/src/pages/AdminWillManagementPage.js

import React, { useState, useEffect, useCallback } from "react";
import {
  PageContainer,
  Title,
  TopControls,
  SearchRow,
  Label,
  Select,
  Input,
  Button,
  FilterButtons,
  Actions,
  ActionButton,
  TableContainer,
  Table,
  Tr,
  Td,
  Th,
} from "./Style/AdminManagementStyle";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
// import willService from "../../services/willService"; // 경로 확인 필요
import willService from "../../services/willService"; // 일반적인 src 내 경로로 수정

const AdminWillManagementPage = () => {
  const [wills, setWills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // 성공 메시지 상태 추가
  const [selectedWillIds, setSelectedWillIds] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'descending' }); 

  const [searchParams, setSearchParams] = useState({
    condition: "", 
    keyword: "",
  });

  const [selectedWillDetail, setSelectedWillDetail] = useState(null);
  const [newStatusForAction, setNewStatusForAction] = useState("");

  const fetchWills = useCallback(async () => {
    setIsLoading(true);
    // setError(''); // 목록 조회 시에는 이전 성공/오류 메시지 유지 가능, 혹은 초기화 선택
    // setSuccessMessage(''); 
    try {
      const data = await willService.getAllWillsByAdmin();
      // console.log(data); // 개발 중 확인용 로그
      let filteredData = data || [];
      if (searchParams.condition && searchParams.keyword) {
          const lowerKeyword = searchParams.keyword.toLowerCase();
          filteredData = data.filter(will => {
              let valueToSearch = '';
              if (searchParams.condition === 'originalTitle') {
                valueToSearch = String(will.originalTitle || '').toLowerCase();
              } else if (searchParams.condition === 'originalTestatorUsername') {
                valueToSearch = String(will.originalTestatorUsername || '').toLowerCase();
              } else if (searchParams.condition === 'id') {
                valueToSearch = String(will.id || '').toLowerCase();
              } else if (searchParams.condition === 'title') { 
                valueToSearch = String(will.title || '').toLowerCase();
              } else if (searchParams.condition === 'testatorId') { 
                valueToSearch = String(will.testatorId || '').toLowerCase();
              } else if (searchParams.condition === 'status') {
                valueToSearch = String(will.status || '').toLowerCase();
              }
              return valueToSearch.includes(lowerKeyword);
          });
      }
      setWills(filteredData);
    } catch (err) {
      console.error("Error fetching wills:", err.data || err.message);
      setError(err.data?.error || err.message || '유언장 목록을 불러오는 데 실패했습니다.');
      setSuccessMessage(''); // 오류 발생 시 성공 메시지 초기화
      setWills([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]); 

  useEffect(() => {
    fetchWills();
  }, [fetchWills]);

  const handleSearchParamChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setError('');
    setSuccessMessage('');
    fetchWills();
    setSelectedWillIds(new Set());
  };
  
  const toggleSelect = (willId) => {
    setSelectedWillIds(prevSelectedIds => {
      const newSelectedIds = new Set(prevSelectedIds);
      if (newSelectedIds.has(willId)) {
        newSelectedIds.delete(willId);
      } else {
        newSelectedIds.add(willId);
      }
      return newSelectedIds;
    });
  };

  const toggleSelectAll = () => {
    if (selectedWillIds.size === wills.length && wills.length > 0) {
      setSelectedWillIds(new Set());
    } else {
      setSelectedWillIds(new Set(wills.map(w => w.id)));
    }
  };

  // 상태 변경 로직 수정
  const handleChangeWillStatus = async () => {
    if (selectedWillIds.size === 0) {
      alert("상태를 변경할 유언장을 선택해주세요.");
      return;
    }
    if (!newStatusForAction) {
        alert("변경할 새로운 상태를 선택해주세요.");
        return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage(''); // 이전 성공 메시지 초기화
    let successCount = 0;
    let errorCount = 0;
    let lastErrorMessage = '';

    // 여러 항목 동시 처리 시 Promise.allSettled 사용 고려 가능
    for (const willId of selectedWillIds) { // Set은 순서가 보장되지 않지만, 여기서는 개별 처리하므로 괜찮음
      try {
        const response = await willService.updateWillStatusAdmin(willId, newStatusForAction);
        console.log(`Status of will ID ${willId} updated to ${newStatusForAction}. Message: ${response.message}`);
        successCount++;
      } catch (err) {
        console.error(`Error updating status for will ${willId}:`, err.data || err.message);
        lastErrorMessage = err.data?.error || err.message || `${willId} 상태 변경 실패`;
        errorCount++;
        // 여러 개 중 하나라도 실패하면 반복 중단 또는 계속 진행 후 종합 메시지 표시 선택 가능
        // 여기서는 계속 진행하고 마지막 에러 메시지를 표시
      }
    }
    setIsLoading(false);

    if (successCount > 0 && errorCount === 0) {
        setSuccessMessage(`${successCount}개 유언장의 상태가 ${newStatusForAction}(으)로 성공적으로 변경되었습니다.`);
    } else if (successCount > 0 && errorCount > 0) {
        setSuccessMessage(`${successCount}개 유언장 상태 변경 성공.`);
        setError(`그러나 ${errorCount}개 유언장 상태 변경 중 오류 발생: ${lastErrorMessage}`);
    } else if (errorCount > 0) {
        setError(`${errorCount}개 유언장 상태 변경 중 오류 발생: ${lastErrorMessage}`);
    }
    
    setSelectedWillIds(new Set()); // 선택 해제
    setNewStatusForAction(""); // 상태 선택 드롭다운 초기화
    fetchWills(); // 목록 새로고침
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      key = 'createdAt'; 
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedWills = React.useMemo(() => {
    let sortableItems = [...wills];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (['id', 'title', 'testatorId', 'status', 'originalTitle', 'originalTestatorUsername'].includes(sortConfig.key)) {
            aValue = String(aValue || '').toLowerCase(); 
            bValue = String(bValue || '').toLowerCase();
        } else if (sortConfig.key === 'createdAt'){
            aValue = aValue ? new Date(aValue) : new Date(0); 
            bValue = bValue ? new Date(bValue) : new Date(0);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [wills, sortConfig]);

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <MdArrowUpward size={16} /> : <MdArrowDownward size={16} />;
    }
    return <MdArrowDownward size={16} style={{ opacity: 0.3 }}/>; 
  };

  const handleViewWillDetail = async (willId) => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    setSelectedWillDetail(null);
    try {
        const data = await willService.getWillDetailByIdAdmin(willId);
        setSelectedWillDetail(data);
    } catch (err) {
        console.error(`Error fetching will detail for ID ${willId} (admin):`, err.data || err.message);
        setError(err.data?.error || err.message || `ID가 ${willId}인 유언장 상세 정보를 불러오는 데 실패했습니다.`);
        setSelectedWillDetail(null);
    } finally {
        setIsLoading(false);
    }
  };

  if (selectedWillDetail) {
    return (
        <PageContainer>
            <Title>유언장 상세 정보 (ID: {selectedWillDetail?.blockchainData?.id || selectedWillDetail?.id})</Title>
            {isLoading && <div>상세 정보 로딩 중...</div>}
            {error && !isLoading && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>오류: {error}</div>}
            {!isLoading && selectedWillDetail && (
                <div className="will-detail-container" style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px', backgroundColor: '#f9f9f9', whiteSpace: 'pre-wrap' }}>
                    <pre>{JSON.stringify(selectedWillDetail, null, 2)}</pre>
                    <Button onClick={() => { setSelectedWillDetail(null); setError(''); setSuccessMessage(''); }} style={{marginTop: '10px'}}>목록으로 돌아가기</Button>
                </div>
            )}
            {!isLoading && !selectedWillDetail && !error && <div style={{marginTop: '10px'}}>상세 정보를 불러올 수 없습니다.</div>}
        </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Title>관리자 유언장 관리 페이지</Title>

      {/* 성공 및 오류 메시지 표시 영역 */}
      {successMessage && <div style={{ color: 'green', marginBottom: '10px', padding: '10px', border: '1px solid green', borderRadius: '4px' }}>{successMessage}</div>}
      {error && <div style={{ color: 'red', marginBottom: '10px', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>오류: {error}</div>}


      <TopControls>
        <SearchRow>
          <Label htmlFor="condition">조건 검색</Label>
          <Select id="condition" name="condition" value={searchParams.condition} onChange={handleSearchParamChange}>
            <option value="">선택</option>
            <option value="originalTitle">원본 제목</option>
            <option value="originalTestatorUsername">원본 작성자</option>
            <option value="id">유언장 ID (해시)</option>
            <option value="status">상태</option>
            <option value="title">제목 (해시)</option> 
            <option value="testatorId">작성자 ID (해시)</option> 
          </Select>
          <Input
            type="text"
            name="keyword"
            placeholder="검색어 입력"
            value={searchParams.keyword}
            onChange={handleSearchParamChange}
          />
          <Button onClick={handleSearch} disabled={isLoading}>검색</Button>
        </SearchRow>
        <FilterButtons>
          <Button onClick={() => { setError(''); setSuccessMessage(''); fetchWills(); setSelectedWillIds(new Set()); setSearchParams({condition: "", keyword: ""}); } }>전체보기/초기화</Button>
        </FilterButtons>
      </TopControls>

      <Actions>
        <ActionButton onClick={toggleSelectAll} disabled={isLoading || wills.length === 0}>
            {selectedWillIds.size === wills.length && wills.length > 0 ? "전체 해제" : "전체 선택"}
        </ActionButton>
        <Select 
            value={newStatusForAction} 
            onChange={(e) => setNewStatusForAction(e.target.value)}
            style={{marginRight: '10px', padding: '8px', height: '38px'}}
            disabled={isLoading}
        >
            <option value="">변경할 상태 선택</option>
            <option value="REGISTERED">REGISTERED</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="EXPIRED">EXPIRED</option>
            {/* 체인코드에 정의된 상태값과 일치하도록 */}
            <option value="REVOKED_BY_ADMIN">REVOKED_BY_ADMIN</option> 
            <option value="EXECUTED">EXECUTED</option> 
            {/* REVOKED는 REVOKED_BY_ADMIN 또는 REVOKED_BY_TESTATOR 등으로 구체화될 수 있음. 체인코드 확인 필요 */}
        </Select>
        <ActionButton danger onClick={handleChangeWillStatus} disabled={isLoading || selectedWillIds.size === 0 || !newStatusForAction}>
          선택 항목 상태 변경
        </ActionButton>
      </Actions>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th style={{width: '5%'}}>
                <input type="checkbox" onChange={toggleSelectAll} checked={selectedWillIds.size === wills.length && wills.length > 0 && wills.length > 0} disabled={isLoading || wills.length === 0}/>
              </Th>
              <Th onClick={() => requestSort('id')} style={{cursor: 'pointer', width: '15%'}}>유언장 ID {getSortIndicator('id')}</Th>
              <Th onClick={() => requestSort('originalTitle')} style={{cursor: 'pointer', width: '20%'}}>원본 제목 {getSortIndicator('originalTitle')}</Th>
              <Th onClick={() => requestSort('originalTestatorUsername')} style={{cursor: 'pointer', width: '15%'}}>원본 작성자 {getSortIndicator('originalTestatorUsername')}</Th>
              <Th onClick={() => requestSort('status')} style={{cursor: 'pointer', width: '10%'}}>상태 {getSortIndicator('status')}</Th>
              <Th onClick={() => requestSort('createdAt')} style={{cursor: 'pointer', width: '15%'}}>생성일 {getSortIndicator('createdAt')}</Th>
              <Th style={{width: '10%'}}>관리</Th>
            </tr>
          </thead>
          <tbody>
            {isLoading && wills.length === 0 && ( // 첫 로딩 시 또는 검색 중 데이터 없을 때
                <Tr><Td colSpan="7">유언장 목록을 불러오는 중...</Td></Tr>
            )}
            {!isLoading && !error && sortedWills.length === 0 && (
              <Tr><Td colSpan="7">표시할 유언장이 없습니다.</Td></Tr>
            )}
            {/* 에러 발생 시에는 별도 메시지 영역에서 표시하므로, 여기서는 목록을 비우거나 로딩 상태가 아닐때만 목록 표시 */}
            {!isLoading && sortedWills.map((will) => ( // 에러 없을 때만 목록 렌더링
              <Tr key={will.id}>
                <Td>
                  <input
                    type="checkbox"
                    checked={selectedWillIds.has(will.id)}
                    onChange={() => toggleSelect(will.id)}
                  />
                </Td>
                <Td>{will.id}</Td>
                <Td>{will.originalTitle || '(원본 제목 없음)'}</Td> 
                <Td>{will.originalTestatorUsername || '(원본 작성자 없음)'}</Td>
                <Td>{will.status}</Td>
                <Td>{will.createdAt ? new Date(will.createdAt).toLocaleString() : '-'}</Td>
                <Td>
                  <Button size="small" onClick={() => handleViewWillDetail(will.id)} disabled={isLoading}>상세보기</Button>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};

export default AdminWillManagementPage;
import { Card, Select, Space, Spin, Alert, Button } from 'antd';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import type { ILocation } from '../../shared/types/types';
import { getLocations } from '../../shared/api/enpoints';
import { useInfinityScroll } from '../../shared/hooks/useInfinityScroll';

export const Locations = () => {
    const [searchParams, setSearchParams] = useSearchParams({ sortOrder: 'asc' });
    const [sortOrder, setSortOrder] = useState<string>(searchParams.get('sortOrder') ?? 'asc');
    const [sortedData, setSortedData] = useState<ILocation[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchLocations = useCallback(async (page: number): Promise<ILocation[]> => {
        if(loading && !hasMore) return [];
        try {
            const response = await getLocations(page);
            if(response.info.next === null) setHasMore(false);

            return response.results;
        } catch (error) {
            console.error('Error fetching locations:', error);
            throw new Error('Failed to load locations');
        }
    }, [hasMore]);

    const {data: locationsData, loading, error, targetRef, loadMore, reset} = useInfinityScroll({fetchData: fetchLocations, hasMore, initialPage: 1, threshold: 0.1});

    const CardClick = useCallback((id: string) => {
        navigate(`${location.pathname}/${id}`);
    }, [navigate, location.pathname]);

    const handleSortChange = useCallback((value: string) => {
        setSortOrder(value);
        setSearchParams({ sortOrder: value });
    }, [setSearchParams]);

    useEffect(() => {
        if (locationsData.length > 0) {
            const sorted = [...locationsData].sort((a, b) => {
                const dateA = new Date(a.created).getTime();
                const dateB = new Date(b.created).getTime();
                
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            });
            setSortedData(sorted);
        }
    }, [locationsData, sortOrder]);

    useEffect(() => {
        const handleClick = (event: Event) => {
            const cardElement = (event.target as Element).closest('.ant-card');
            
            if (cardElement && cardElement.id) {
                const cardId = cardElement.id;
                CardClick(cardId);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('click', handleClick);

            return () => {
                container.removeEventListener('click', handleClick);
            };
        }
    }, [CardClick]);

    const handleRetry = useCallback(() => {
        reset();
        loadMore();
    }, [reset, loadMore]);

    return (
        <div style={{ padding: '20px' }}>
            <Space style={{ marginBottom: 16 }} direction="vertical">
                <Space>
                    <span>Сортировка по дате создания:</span>
                    <Select
                        value={sortOrder}
                        onChange={handleSortChange}
                        style={{ width: 200 }}
                    >
                        <Select.Option value="asc">По возрастанию</Select.Option>
                        <Select.Option value="desc">По убыванию</Select.Option>
                    </Select>
                </Space>
                
                <div>
                    <small>
                        Загружено локаций: {sortedData.length}
                        {hasMore && ' (есть ещё)'}
                        {!hasMore && sortedData.length > 0 && ' (все загружены)'}
                    </small>
                </div>
            </Space>

            {error && (
                <Alert
                    message="Ошибка загрузки"
                    description={error}
                    type="error"
                    action={
                        <Button size="small" onClick={handleRetry}>
                            Повторить
                        </Button>
                    }
                    style={{ marginBottom: 16 }}
                />
            )}

            <div className="locations" ref={containerRef}>
                {sortedData.map((item: ILocation) => (
                    <Card
                        key={item.id}
                        id={item.id.toString()}
                        title={item.name}
                        style={{ width: 300, marginBottom: 16 }}
                        extra={
                            <small>
                                {new Date(item.created).toLocaleDateString()}
                            </small>
                        }
                    >
                        <p><strong>Тип:</strong> {item.type}</p>
                        <p><strong>Измерение:</strong> {item.dimension}</p>
                    </Card>
                ))}
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                {loading && <Spin size="large" tip="Загрузка локаций..." />}
                
                {!loading && hasMore && (
                    <div ref={targetRef} style={{ height: '20px' }} />
                )}
                
                {!hasMore && sortedData.length > 0 && (
                    <Alert
                        message="Все локации загружены"
                        description={`Всего загружено ${sortedData.length} локаций`}
                        type="info"
                        showIcon
                    />
                )}
                
                {!loading && sortedData.length === 0 && !error && (
                    <Alert
                        message="Локации не найдены"
                        description="Попробуйте изменить параметры поиска"
                        type="warning"
                        showIcon
                    />
                )}
            </div>
        </div>
    );
};
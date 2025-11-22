import { Card, Select, Space, Spin, Alert, Button } from 'antd';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import type { IEpisode } from '../../shared/types/types';
import { getEpisodes } from '../../shared/api/enpoints';
import { useInfinityScroll } from '../../shared/hooks/useInfinityScroll';

export const Episodes = () => {
    const [searchParams, setSearchParams] = useSearchParams({ sortOrder: 'asc' });
    const [sortOrder, setSortOrder] = useState<string>(searchParams.get('sortOrder') ?? 'asc');
    const [sortedData, setSortedData] = useState<IEpisode[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchEpisodes = useCallback(async (page: number): Promise<IEpisode[]> => {
        if(loading && !hasMore) return [];
        try {
            const response = await getEpisodes(page);
            if(response.info.next === null) setHasMore(false);

            return response.results;
        } catch (error) {
            console.error('Error fetching episodes:', error);
            throw new Error('Failed to load episodes');
        }
    }, [hasMore]);

    const {data: episodesData, loading, error, targetRef, loadMore, reset} = useInfinityScroll({fetchData: fetchEpisodes, hasMore, initialPage: 1, threshold: 0.1});

    const CardClick = useCallback((id: string) => {
        navigate(`${location.pathname}/${id}`);
    }, [navigate, location.pathname]);

    const handleSortChange = useCallback((value: string) => {
        setSortOrder(value);
        setSearchParams({ sortOrder: value });
    }, [setSearchParams]);

    useEffect(() => {
        if (episodesData.length > 0) {
            const sorted = [...episodesData].sort((a, b) => {
                const dateA = new Date(a.created).getTime();
                const dateB = new Date(b.created).getTime();
                
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            });
            setSortedData(sorted);
        }
    }, [episodesData, sortOrder]);

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
                        Загружено эпизодов: {sortedData.length}
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

            <div className="episodes" ref={containerRef}>
                {sortedData.map((item: IEpisode) => (
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
                        <p><strong>Эпизод:</strong> {item.episode}</p>
                        <p><strong>Дата выхода:</strong> {item.air_date}</p>
                    </Card>
                ))}
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                {loading && <Spin size="large" tip="Загрузка эпизодов..." />}
                
                {!loading && hasMore && (
                    <div ref={targetRef} style={{ height: '20px' }} />
                )}
                
                {!hasMore && sortedData.length > 0 && (
                    <Alert
                        message="Все эпизоды загружены"
                        description={`Всего загружено ${sortedData.length} эпизодов`}
                        type="info"
                        showIcon
                    />
                )}
                
                {!loading && sortedData.length === 0 && !error && (
                    <Alert
                        message="Эпизоды не найдены"
                        description="Попробуйте изменить параметры поиска"
                        type="warning"
                        showIcon
                    />
                )}
            </div>
        </div>
    );
};
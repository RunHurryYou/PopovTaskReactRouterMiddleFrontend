import { Card, Select, Space } from 'antd';
import { useEffect, useState, useRef, useCallback } from 'react';
import locationData from '../../mocks/location.json';
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import type { ILocation } from '../../types/types';

export const Locations = () => {
    const [searchParams, setSearchParams] = useSearchParams({sortOrder: 'asc'});
    const [sortOrder, setSortOrder] = useState<string>(searchParams.get('sortOrder') ?? 'asc');
    const [sortedData, setSortedData] = useState<ILocation[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const CardCLick = useCallback((id: string ) => {
        navigate(`${location.pathname}/${id}`);
    }, [navigate, location.pathname]);

    const handleSortChange = useCallback((value: string) => {
        setSortOrder(value);
        if(value === 'asc') {
            setSortedData(locationData.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()));
        }
        else {
            setSortedData(locationData.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()));
        }
        setSearchParams({sortOrder: value});
    },[setSearchParams]);

    useEffect(() => {
        handleSortChange(sortOrder);

        const handleClick = (event: Event) => {
            const cardElement = (event.target as Element).closest('.ant-card');
            
            if (cardElement && cardElement.id) {
                const cardId = cardElement.id;
                CardCLick(cardId);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('click', handleClick);
            
            return () => {
                container.removeEventListener('click', handleClick);
            };
        }
    }, [CardCLick, containerRef, handleSortChange, sortOrder]);
    return (
        <div style={{ padding: '20px' }}>
            <Space style={{ marginBottom: 16 }}>
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
            <div className="locations" ref={containerRef}>
                {
                    sortedData.map((item: ILocation) => (
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
                        />
                    ))
                }
            </div>
        </div>
    );
};

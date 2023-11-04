import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAccessibleUrl(url: string) {
    const navigate = useNavigate();
    useEffect(() => navigate(url), [navigate, url]);
}

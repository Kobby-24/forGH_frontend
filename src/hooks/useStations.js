import { useEffect, useState, useRef, useCallback } from 'react';

// Simple hook to fetch stations from backend once per component mount.
// Exposes stations array, setter (so callers can append locally), loading, error and refetch.
export default function useStations() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const fetchStations = useCallback(async () => {
    if (controllerRef.current) controllerRef.current.abort();
  const controller = new AbortController();
  // timestamp fetch start so we can guarantee a minimum skeleton display time
  controller.startTime = Date.now();
    controllerRef.current = controller;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://forgh-457a24871359.herokuapp.com/stations/', {
        method: 'GET',
        headers: { accept: 'application/json' },
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStations(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name === 'AbortError') {
        // treat abort as a non-error but ensure loading is false
        setLoading(false);
        controllerRef.current = null;
        return;
      }
      setError(err.message || 'Failed to fetch stations');
      setStations([]);
    } finally {
      // Ensure the loading indicator shows for at least a short time so
      // skeletons are visible even when the network is very fast.
      const MIN_VISIBLE_MS = 300;
      try {
        const start = controller.startTime || Date.now();
        const elapsed = Date.now() - start;
        if (elapsed < MIN_VISIBLE_MS) {
          await new Promise((r) => setTimeout(r, MIN_VISIBLE_MS - elapsed));
        }
      } catch (e) {
        // ignore
      }
      setLoading(false);
      controllerRef.current = null;
    }
  }, []);

  useEffect(() => {
    fetchStations();
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [fetchStations]);

  const refetch = useCallback(() => fetchStations(), [fetchStations]);

  return { stations, setStations, loading, error, refetch };
}

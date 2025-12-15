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
        setLoading(false);
        controllerRef.current = null;
        return;
      }
      setError(err.message || 'Failed to fetch stations');
      setStations([]);
    } finally {
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

const useStationsList = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://forgh-457a24871359.herokuapp.com/stations/list');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setStations(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Failed to fetch stations');
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  return { stations, loading, error };
};

const useDashboardSummary = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const fetchDashboardSummary = useCallback(async () => {
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controller.startTime = Date.now();
    controllerRef.current = controller;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://forgh-457a24871359.herokuapp.com/stations/dashboard/summary', {
        method: 'GET',
        headers: { accept: 'application/json' },
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStations(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name === 'AbortError') {
        setLoading(false);
        controllerRef.current = null;
        return;
      }
      setError(err.message || 'Failed to fetch dashboard summary');
      setStations([]);
    } finally {
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
    fetchDashboardSummary();
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [fetchDashboardSummary]);

  const refetch = useCallback(() => fetchDashboardSummary(), [fetchDashboardSummary]);

  return { stations, setStations, loading, error, refetch };
};

const useStationById = (id) => {
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const fetchStation = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controller.startTime = Date.now();
    controllerRef.current = controller;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://forgh-457a24871359.herokuapp.com/stations/${id}`, {
        method: 'GET',
        headers: { accept: 'application/json' },
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStation(data || null);
    } catch (err) {
      if (err.name === 'AbortError') {
        setLoading(false);
        controllerRef.current = null;
        return;
      }
      setError(err.message || 'Failed to fetch station');
      setStation(null);
    } finally {
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
  }, [id]);

  useEffect(() => {
    fetchStation();
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [fetchStation]);

  const refetch = useCallback(() => fetchStation(), [fetchStation]);

  return { station, loading, error, refetch };
};

const useHistoricalRecord = (stationId, periodId) => {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const fetchRecord = useCallback(async () => {
    if (!stationId || !periodId) {
      setLoading(false);
      return;
    }

    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controller.startTime = Date.now();
    controllerRef.current = controller;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://forgh-457a24871359.herokuapp.com/stations/${stationId}/history/${periodId}`, {
        method: 'GET',
        headers: { accept: 'application/json' },
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setRecord(data || null);
    } catch (err) {
      if (err.name === 'AbortError') {
        setLoading(false);
        controllerRef.current = null;
        return;
      }
      setError(err.message || 'Failed to fetch historical record');
      setRecord(null);
    } finally {
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
  }, [stationId, periodId]);

  useEffect(() => {
    fetchRecord();
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [fetchRecord]);

  const refetch = useCallback(() => fetchRecord(), [fetchRecord]);

  return { record, loading, error, refetch };
};

export { useStationsList, useDashboardSummary, useStationById, useHistoricalRecord };
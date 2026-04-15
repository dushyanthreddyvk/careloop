import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService, appointmentService, medicalRecordService, doctorService } from '../services/api';

// Hook for handling API calls with loading and error states
export function useApiCall(asyncFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFunction(...args);
      setData(result.data);
      return result.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  return { data, loading, error, execute };
}

// Hook for login
export function useLogin() {
  const { login } = useAuth();
  const { loading, error, execute } = useApiCall(authService.login);

  const handleLogin = useCallback(async (hospitalId, password) => {
    try {
      const result = await execute(hospitalId, password);
      login({
        ...result.user,
        token: result.token,
      });
      return result;
    } catch (err) {
      throw err;
    }
  }, [execute, login]);

  return { loading, error, login: handleLogin };
}

// Hook for fetching appointments
export function useAppointments(filters = {}) {
  const { loading, error, data, execute } = useApiCall(
    () => appointmentService.getAll(filters)
  );

  const fetchAppointments = useCallback(async () => {
    return execute();
  }, [execute]);

  return {
    appointments: data || [],
    loading,
    error,
    refetch: fetchAppointments,
  };
}

// Hook for creating appointment
export function useCreateAppointment() {
  const { loading, error, execute } = useApiCall(appointmentService.create);

  return {
    createAppointment: execute,
    loading,
    error,
  };
}

// Hook for fetching medical records
export function useMedicalRecords(filters = {}) {
  const { loading, error, data, execute } = useApiCall(
    () => medicalRecordService.getAll(filters)
  );

  const fetchRecords = useCallback(async () => {
    return execute();
  }, [execute]);

  return {
    records: data || [],
    loading,
    error,
    refetch: fetchRecords,
  };
}

// Hook for uploading medical record file
export function useUploadMedicalRecord() {
  const handleUpload = useCallback(async (recordId, file) => {
    try {
      const result = await medicalRecordService.uploadFile(recordId, file);
      return result.data;
    } catch (err) {
      throw err;
    }
  }, []);

  return { uploadRecord: handleUpload };
}

// Hook for fetching doctors
export function useDoctors(filters = {}) {
  const { loading, error, data, execute } = useApiCall(
    () => doctorService.getAll(filters)
  );

  const fetchDoctors = useCallback(async () => {
    return execute();
  }, [execute]);

  return {
    doctors: data || [],
    loading,
    error,
    refetch: fetchDoctors,
  };
}

// Hook for searching doctors
export function useSearchDoctors() {
  const { loading, error, data, execute } = useApiCall(doctorService.search);

  const search = useCallback(async (query) => {
    return execute(query);
  }, [execute]);

  return {
    results: data || [],
    loading,
    error,
    search,
  };
}

// Hook for getting available appointment slots
export function useAvailableSlots(doctorId, date) {
  const { loading, error, data, execute } = useApiCall(() =>
    appointmentService.getAvailableSlots(doctorId, date)
  );

  const fetchSlots = useCallback(async () => {
    if (doctorId && date) {
      return execute();
    }
  }, [execute, doctorId, date]);

  return {
    slots: data || [],
    loading,
    error,
    refetch: fetchSlots,
  };
}

// Hook for cancelling appointment
export function useCancelAppointment() {
  const { loading, error, execute } = useApiCall((id, reason) =>
    appointmentService.cancel(id, reason)
  );

  return {
    cancelAppointment: execute,
    loading,
    error,
  };
}

// Hook for getting queue status
export function useQueueStatus(appointmentId) {
  const [queueData, setQueueData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQueueStatus = useCallback(async () => {
    if (!appointmentId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/queue/${appointmentId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setQueueData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [appointmentId]);

  return {
    queueData,
    loading,
    error,
    refetch: fetchQueueStatus,
  };
}

export default {
  useApiCall,
  useLogin,
  useAppointments,
  useCreateAppointment,
  useMedicalRecords,
  useUploadMedicalRecord,
  useDoctors,
  useSearchDoctors,
  useAvailableSlots,
  useCancelAppointment,
  useQueueStatus,
};

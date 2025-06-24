import {
  type InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAPI from "./useAPI";

const useApiMutation = <T, V = T>({
  endpoint,
  customQueryKey,
}: {
  endpoint: string;
  customQueryKey?: (string | unknown)[];
}) => {
  const { post, patch, remove } = useAPI<T | V>();
  const queryClient = useQueryClient();
  const queryKey = [
    endpoint?.toString(),
    ...(customQueryKey || []),
  ] as InvalidateQueryFilters;

  // Create function
  const createFn = async (data: T) => {
    const response = await post(endpoint, data);
    if (!response?.status) throw new Error(response?.message);
  };

  type UpdateArgs = {
    id: string;
    data?: Partial<T | V>;
  };

  // Updated mutation function
  const updateFn = async ({ id, data }: UpdateArgs): Promise<void> => {
    const response = await patch(endpoint, id, data);
    if (!response?.status)
      throw new Error(response?.message ?? "An error occurred");
  };

  // Delete function
  const deleteFn = async (id: string) => {
    const response = await remove(endpoint, id);
    if (!response?.status) throw new Error(response?.message);
  };

  // Mutation hook for create
  const createMutation = useMutation({
    mutationFn: createFn,
    onSuccess: () => {
      void queryClient.invalidateQueries(queryKey);
    },
  });

  // Mutation hook for update
  const updateMutation = useMutation({
    mutationFn: updateFn,
    onSuccess: () => {
      void queryClient.invalidateQueries(queryKey);
    },
  });

  // Mutation hook for delete
  const deleteMutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      void queryClient.invalidateQueries(queryKey);
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};

export default useApiMutation;

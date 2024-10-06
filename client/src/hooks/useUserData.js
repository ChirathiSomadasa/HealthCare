import { useQuery } from "@tanstack/react-query";
import UserAPI from "../api/UserAPI";

export const useUsersData = (role) => {
  return useQuery({
    queryKey: ["users", role],
    queryFn: () => UserAPI.getUsers(role),
    enabled: !!role,
  });
};

export const useUserData = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => UserAPI.getUserById(id),
    enabled: !!id,
  });
};

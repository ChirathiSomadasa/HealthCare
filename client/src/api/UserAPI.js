import api from "./api";

class UserAPI {
  // Get all users
  static getUsers(role) {
    return api.get("/api/users", {
      params: { role },
    });
  }

  // Get user by id
  static getUserById(id) {
    return api.get(`/api/users/${id}`);
  }

  // Update user
  static updateUser({ id, data }) {
    return api.patch(`/api/users/${id}`, data);
  }

  // Delete user
  static deleteUser(id) {
    return api.delete(`/api/users/${id}`);
  }

  // Get users count
  static getUsersCount() {
    return api.get("/api/users/count");
  }
}

export default UserAPI;

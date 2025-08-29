// permissions/rolePermissions.js

const rolePermissions = {
  admin: ["create:task", "read:task", "update:task", "delete:task"],
  editor: ["create:task", "read:task", "update:task"],
  user: ["read:task"]
};

module.exports = rolePermissions;

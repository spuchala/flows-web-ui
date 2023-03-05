const setOrgDepartmentPeopleDataToStorage = (orgDepartmentPeopleData) => {
  sessionStorage.setItem(
    "orgDepartmentPeople",
    JSON.stringify(orgDepartmentPeopleData)
  );
};

const getOrgDepartmentPeopleDataToStorage = () => {
  var orgDeptPeopleJSON = sessionStorage.getItem("orgDepartmentPeople");
  return orgDeptPeopleJSON ? JSON.parse(orgDeptPeopleJSON) : null;
};

export {
  setOrgDepartmentPeopleDataToStorage,
  getOrgDepartmentPeopleDataToStorage
};

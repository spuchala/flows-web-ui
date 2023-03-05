const setOrgDepartmentPeopleDataToStorage = (orgDepartmentPeopleData) => {
  sessionStorage.setItem(
    "orgDepartmentPeople",
    JSON.stringify(orgDepartmentPeopleData)
  );
};

export { setOrgDepartmentPeopleDataToStorage };

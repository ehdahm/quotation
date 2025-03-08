import * as scopeOfWorksApi from "../apis/scopeOfWorks";

export async function getScopeOfWorks() {
  try {
    const scopeOfWorks = await scopeOfWorksApi.getScopeOfWorks();
    console.log(scopeOfWorks);
    return scopeOfWorks;
  } catch (error) {
    console.error("Error fetching Scope Of Works:", error);
    throw error;
  }
}

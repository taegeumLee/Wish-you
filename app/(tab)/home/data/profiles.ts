export default async function getProfiles() {
  try {
    const response = await fetch("/api/profiles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("프로필을 가져오는데 실패했습니다");
    }

    return response.json();
  } catch (error) {
    console.error("프로필 데이터 가져오기 실패:", error);
    throw error;
  }
}

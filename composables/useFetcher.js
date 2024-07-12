export function useFetcher(
  url,
  options = {}
) {
  return useFetch(url, {
    $fetch: $fetcher,
    async onResponseError({ response }) {
      const status = response.status;
      if ([500].includes(status)) {
        console.error("[Laravel Error]", response.statusText, response._data);
      }

      if ([401, 419].includes(status)) {
        navigateTo("/login");
      }

      if ([409].includes(status)) {
        navigateTo("/verify-email");
      }
    },
    ...options,
  });
}

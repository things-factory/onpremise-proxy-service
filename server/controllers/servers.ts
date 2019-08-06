export const servers = () => {
  return (global as any).onpremiseServers || []
}

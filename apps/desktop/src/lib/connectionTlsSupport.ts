import type { DatabaseType } from "@/types/database";

const TLS_CAPABLE_DATABASE_TYPES = new Set<DatabaseType>(["mysql", "starrocks", "postgres", "redshift", "gaussdb", "kwdb", "opengauss", "questdb", "redis", "etcd", "clickhouse", "elasticsearch", "qdrant", "milvus", "weaviate", "chromadb", "influxdb"]);

const BARE_MYSQL_PROFILES_WITHOUT_TLS = new Set(["doris", "selectdb", "oceanbase"]);

const CA_CERT_PATH_DATABASE_TYPES = new Set<DatabaseType>(["mysql", "clickhouse", "etcd", "starrocks"]);

export function supportsConnectionTlsTab(dbType: DatabaseType): boolean {
  return TLS_CAPABLE_DATABASE_TYPES.has(dbType);
}

export function supportsMysqlTlsOptions(dbType: DatabaseType, driverProfile?: string): boolean {
  const profile = driverProfile?.trim().toLowerCase() || "";
  return dbType === "starrocks" || (dbType === "mysql" && !BARE_MYSQL_PROFILES_WITHOUT_TLS.has(profile));
}

export function sanitizeConnectionCaCertPath<T extends { db_type: DatabaseType; ca_cert_path?: string }>(config: T): T {
  if (!CA_CERT_PATH_DATABASE_TYPES.has(config.db_type)) {
    return { ...config, ca_cert_path: undefined };
  }
  return { ...config, ca_cert_path: config.ca_cert_path?.trim() || "" };
}

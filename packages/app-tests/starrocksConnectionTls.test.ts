import { strict as assert } from "node:assert";
import { test } from "vitest";
import {
  sanitizeConnectionCaCertPath,
  supportsConnectionTlsTab,
  supportsMysqlTlsOptions,
} from "../../apps/desktop/src/lib/connectionTlsSupport.ts";

test("native db_type starrocks shows TLS tab and MySQL TLS options", () => {
  assert.equal(supportsConnectionTlsTab("starrocks"), true);
  assert.equal(supportsMysqlTlsOptions("starrocks"), true);
  assert.equal(supportsMysqlTlsOptions("mysql", "starrocks"), true);
});

test("bare mysql profiles (doris/oceanbase) still excluded from MySQL TLS options", () => {
  assert.equal(supportsConnectionTlsTab("mysql"), true);
  assert.equal(supportsMysqlTlsOptions("mysql", "doris"), false);
  assert.equal(supportsMysqlTlsOptions("mysql", "oceanbase"), false);
});

test("starrocks ca_cert_path preserved on sanitize and trimmed", () => {
  const sanitized = sanitizeConnectionCaCertPath({
    db_type: "starrocks",
    ca_cert_path: "  /tmp/starrocks-ca.pem  ",
  });

  assert.equal(sanitized.ca_cert_path, "/tmp/starrocks-ca.pem");
});

test("postgres ca_cert_path cleared on sanitize", () => {
  const sanitized = sanitizeConnectionCaCertPath({
    db_type: "postgres",
    ca_cert_path: "/tmp/should-not-remain.pem",
  });

  assert.equal(sanitized.ca_cert_path, undefined);
});

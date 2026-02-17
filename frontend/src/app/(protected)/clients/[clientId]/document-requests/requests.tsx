"use client";

import { useMemo, useState } from "react";

import { SearchInput } from "@/components/ui/form/search";
import { Select } from "@/components/ui/form/select";
import { RequestStatus } from "@/types/enums/request";
import { DocumentRequest } from "@/types/models/document";
import { mapEnumToOptions } from "@/utils/input";

import styles from "./document-requests.module.css";
import RequestBox from "./request-box";

interface Props {
  requests: DocumentRequest[];
}

const Requests = ({ requests }: Props) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      const matchesSearch = r.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = status === "all" ? true : r.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [requests, search, status]);

  return (
    <section className={styles.section}>
      <div className={styles.requestHeader}>
        <div className={styles.requestTitleBlock}>
          <h4 className={styles.requestTitle}>Document Requests</h4>

          <span className={styles.requestCount}>
            {filtered.length} request(s)
          </span>
        </div>

        <div className={styles.filters}>
          <SearchInput
            id="request-search"
            placeholder="Search requests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            inputClassName={styles.searchInput}
          />

          <Select
            id="request-status"
            value={status}
            onChange={setStatus}
            options={[
              { label: "All Status", value: "all" },
              ...mapEnumToOptions(RequestStatus),
            ]}
          />
        </div>
      </div>

      <div className={styles.list}>
        {filtered.map((request) => (
          <RequestBox key={request.id} request={request} />
        ))}

        {filtered.length === 0 && (
          <div className={styles.emptyState}>No document requests found</div>
        )}
      </div>
    </section>
  );
};

export default Requests;

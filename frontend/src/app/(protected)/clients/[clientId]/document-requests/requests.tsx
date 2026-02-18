import { DocumentRequest } from "@/types/models/document";

import RequestBox from "./request-box";

interface Props {
  requests: DocumentRequest[];
}

const Requests = ({ requests }: Props) => {
  return (
    <section>
      <h1>Document Requests</h1>

      {requests.map((request) => (
        <RequestBox key={request.id} request={request} />
      ))}
    </section>
  );
};

export default Requests;

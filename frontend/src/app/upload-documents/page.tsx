import { Calendar, CircleCheck, Shield, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { ProgressBar } from "@/components/ui/progress-bar";

import styles from "./upload-documents.module.css";

const UploadDocumentsPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <Logo description="Secure Document Collection" />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.user}>
          <Icon size={14} name={User} tone="muted" />
          <p>
            Requested by <span> Bhaskar Babu</span>
          </p>
        </div>

        <div>
          <h1 className={styles.title}>ITR Filing 2026</h1>
          <p className={styles.description}>
            Hi Priya, please upload the following documents at your earliest
            convenience for your income tax return filing. <br /> All uploads
            are encrypted and safe.
          </p>
        </div>

        <div className={styles.sent}>
          <Icon size={14} name={Calendar} />
          <span>Sent on 10 Feb 2026</span>
        </div>

        <div className={styles.disclosure}>
          <Icon name={Shield} size={22} />
          <p>
            <span>Your files are safe.</span> All uploads are encrypted
            end-to-end and only accessible by your advisor. We never share your
            data with third parties.
          </p>
        </div>

        <div className={styles.progressRow}>
          <p className={styles.progressLabel}>Documents</p>
          <ProgressBar completed={1} total={6} />
        </div>

        <div className={styles.docCard}>
          <div className={styles.docInfo}>
            <Icon name={CircleCheck} tone="success" />
            <div>
              <h3 className={styles.docTitle}>
                PAN Card <span>REQUIRED</span>
              </h3>
              <p className={styles.docHint}>
                Drag & drop or click upload · PDF, JPG, PNG, DOC accepted · Max
                10MB
              </p>
            </div>
          </div>

          <Button intent="primary">Upload</Button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentsPage;

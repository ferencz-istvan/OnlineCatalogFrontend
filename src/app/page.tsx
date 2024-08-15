"use client";
/* Saved links for NEXT.js:
Templates:
https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app
Deploy:
https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app
*/

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.banner}>
        <div className={styles.title}>
          <Link href="/login">Online catalog</Link>
        </div>
        <div className={styles.messageContainer}>
          <span className={styles.messageText}>
            To use catalog, you have to{" "}
          </span>
          <Link href="/login">
            <button className={styles.messageButton}>Log in</button>
          </Link>
        </div>
      </div>
      <div className={styles.secondPage}>
        <div className={styles.forImage}>
          <img src="/icons/table.svg" alt="schoolboard image" />
        </div>
        <div className={styles.forText}>
          <p>
            This website was created to simplify school bureaucracy. Grades,
            absences, and various class data are stored in a database and can be
            accessed by anyone with the appropriate permissions.
          </p>
          <p>
            This particular online journal avoids unnecessary clicks. It is
            highly user-friendly, ensuring that even those who are less familiar
            with computers can accomplish what they need to with ease.
          </p>
          <p>
            The online journal web application can be used by teachers,
            students, and parents alike, with each user seeing the information
            relevant to them. Teachers can quickly and easily update grades and
            attendance records, students can check their progress, and parents
            can stay informed about their child{"'"}s academic performance.
          </p>
          <p>
            If your school still uses traditional paper journals, contact us at
            example@gmail.com to discuss the details of transitioning to our
            online system.
          </p>
        </div>
      </div>
      <p className={styles.footer}>
        For online catalog web app, icons was used from next webpage:
        <a href="https://www.svgrepo.com/svg/520501/schedule" target="_blank">
          https://www.svgrepo.com/svg/520501/schedule
        </a>
      </p>
    </main>
  );
}

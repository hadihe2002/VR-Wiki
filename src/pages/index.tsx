import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className={styles.logoContainer}>
          <img
            src="https://www.sharif.ir/documents/20124/0/logo-fa-IR.png/4d9b72bc-494b-ed5a-d3bb-e7dfd319aec8?t=1609608338755"
            alt="لوگوی دانشگاه صنعتی شریف"
            className={styles.sharifLogo}
          />
        </div>
        <Heading as="h1" className="hero__title">
          اسناد XR
        </Heading>
        <p className={styles.subtitle}>دپارتمان مهندسی صنایع</p>
        <p className={styles.subtitle}>
          آزمایشگاه تحقیقات و توسعه فناوری‌های نوین
        </p>
        <p className={styles.description}>دانشگاه صنعتی شریف</p>
      </div>
    </header>
  );
}

function DocumentationSection() {
  return (
    <section className={styles.docsSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          بخش‌های آموزشی
        </Heading>
        <div className={styles.docsGrid}>
          <div className={styles.docCard}>
            <div className={styles.docIcon}>🚀</div>
            <Heading as="h3" className={styles.docTitle}>
              شروع کار
            </Heading>
            <p className={styles.docDescription}>
              راهنمای جامع برای شروع یادگیری برنامه‌نویسی و توسعه نرم‌افزار
            </p>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro"
            >
              شروع کنید
            </Link>
          </div>

          <div className={styles.docCard}>
            <div className={styles.docIcon}>🥽</div>
            <Heading as="h3" className={styles.docTitle}>
              واقعیت مجازی (VR)
            </Heading>
            <p className={styles.docDescription}>
              آموزش کامل توسعه اپلیکیشن‌های واقعیت مجازی با Unity و XR
            </p>
            <Link
              className="button button--primary button--lg"
              to="/docs/category/vr"
            >
              یادگیری VR
            </Link>
          </div>

          <div className={styles.docCard}>
            <div className={styles.docIcon}>📱</div>
            <Heading as="h3" className={styles.docTitle}>
              واقعیت افزوده (AR)
            </Heading>
            <p className={styles.docDescription}>
              راهنمای توسعه اپلیکیشن‌های واقعیت افزوده برای موبایل و دستگاه‌های
              پوشیدنی
            </p>
            <Link
              className="button button--primary button--lg"
              to="/docs/category/ar"
            >
              یادگیری AR
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <div className="container">
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <Heading as="h2" className={styles.aboutTitle}>
              درباره این پروژه
            </Heading>
            <p className={styles.aboutDescription}>
              این مرکز آموزشی با هدف ارائه دانش عملی و کاربردی در زمینه‌های نوین
              فناوری تأسیس شده است. ما معتقدیم که یادگیری باید در دسترس، کاربردی
              و سرگرم‌کننده باشد.
            </p>
            <p className={styles.aboutDescription}>
              تمامی محتوای آموزشی با همکاری اساتید و دانشجویان دانشگاه صنعتی
              شریف تهیه و ارائه می‌شود.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - دانشگاه صنعتی شریف`}
      description="مرکز تحقیقات و توسعه فناوری‌های نوین در دانشگاه صنعتی شریف"
    >
      <HomepageHeader />
      <DocumentationSection />
      <AboutSection />
    </Layout>
  );
}

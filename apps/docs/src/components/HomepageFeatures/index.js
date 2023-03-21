import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <iframe width='100%' height={600} src='https://stackblitz.com/edit/flexysearch-react?embed=1&file=App.tsx'></iframe>
        </div>
      </div>
    </section>
  );
}

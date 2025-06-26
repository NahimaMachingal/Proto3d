// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import ModelViewer from '../components/ModelViewer';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [data, setData] = useState({
    pythonModelInfo: null,
    nextModelInfo: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const [pythonRes, nextRes] = await Promise.all([
          fetch('http://localhost:8000/python-model-info'),
          fetch('/api/nextjs-model-info'),
        ]);

        if (!pythonRes.ok) throw new Error('Failed to fetch Python model info');
        if (!nextRes.ok) throw new Error('Failed to fetch Next.js model info');

        const [pythonData, nextData] = await Promise.all([
          pythonRes.json(),
          nextRes.json(),
        ]);

        setData({
          pythonModelInfo: pythonData,
          nextModelInfo: nextData,
          error: null,
          loading: false,
        });
      } catch (error) {
        setData(prev => ({
          ...prev,
          error: error.message,
          loading: false
        }));
      }
    };

    fetchModelData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>3D Model Viewer</title>
        <meta name="description" content="3D Model Viewer with integrated backends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>3D Model Viewer</h1>
        
        <div className={styles.viewerContainer}>
          <ModelViewer 
            modelPath="/capsule.obj" 
            texturePath="/capsule0.jpg" 
          />
        </div>

        {data.loading ? (
          <p>Loading model information...</p>
        ) : data.error ? (
          <p className={styles.error}>{data.error}</p>
        ) : (
          <div className={styles.infoContainer}>
            <ModelInfoPanel 
              title="Python Backend Info" 
              data={data.pythonModelInfo} 
            />
            <ModelInfoPanel 
              title="Next.js Backend Info" 
              data={data.nextModelInfo} 
            />
          </div>
        )}
      </main>
    </div>
  );
};

const ModelInfoPanel = ({ title, data }) => (
  <div className={styles.infoPanel}>
    <h3>{title}</h3>
    {data && Object.entries(data).map(([key, value]) => (
      <p key={key}>
        <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {value}
      </p>
    ))}
  </div>
);

export default Home;
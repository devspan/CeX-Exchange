"use client";

import React, { useEffect, useRef } from 'react';

const TradingChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initializeChart = () => {
      if (!(window as any).TradingView || !(window as any).Datafeeds) {
        console.error('TradingView or Datafeeds not loaded');
        return;
      }

      const widget = (window as any).TradingView.widget;

      new widget({
        symbol: 'BTCUSD',
        interval: 'D',
        container_id: chartContainerRef.current?.id,
        datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed('/api/TradingView'),
        library_path: '/TV/charting_library/',
        locale: 'en',
        disabled_features: ['use_localstorage_for_settings'],
        enabled_features: ['study_templates'],
        charts_storage_url: 'https://saveload.tradingview.com',
        charts_storage_api_version: '1.1',
        client_id: 'tradingview.com',
        user_id: 'public_user_id',
        fullscreen: false,
        autosize: true,
        studies_overrides: {},
      });
    };

    const loadScripts = async () => {
      try {
        await loadScript('/TV/charting_library/charting_library.js');
        await loadScript('/TV/datafeeds/udf/dist/bundle.js');
        initializeChart();
      } catch (error) {
        console.error('Failed to load TradingView scripts', error);
      }
    };

    loadScripts();

    return () => {
      const scripts = document.querySelectorAll('script[src^="/TV/"]');
      scripts.forEach(script => script.parentNode?.removeChild(script));
    };
  }, []);

  return (
    <div
      id="tv_chart_container"
      ref={chartContainerRef}
      style={{
        height: '600px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}
    />
  );
};

export default TradingChart;

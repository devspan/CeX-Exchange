'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const TradingChart = ({ symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const widgetRef = useRef<any>(null);
  const [tickerData, setTickerData] = useState<any>(null);

  const loadScript = (src: string) => {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.body.appendChild(script);
    });
  };

  const initializeChart = () => {
    if (!(window as any).TradingView || !(window as any).Datafeeds) {
      console.error('TradingView or Datafeeds not loaded');
      return;
    }

    const widget = (window as any).TradingView.widget;

    widgetRef.current = new widget({
      symbol,
      interval: 'D',
      container_id: chartContainerRef.current?.id,
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(`${process.env.NEXT_PUBLIC_CORE_URL}/chart`),
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
      theme: theme === 'dark' ? 'Dark' : 'Light',
      studies_overrides: {},
      // Use the fetched ticker data to update the chart
      overrides: tickerData ? {
        'price_scale.alignment': 'right',
        'mainSeriesProperties.candleStyle.upColor': '#4caf50',
        'mainSeriesProperties.candleStyle.downColor': '#f44336',
        'mainSeriesProperties.candleStyle.borderUpColor': '#4caf50',
        'mainSeriesProperties.candleStyle.borderDownColor': '#f44336',
        'mainSeriesProperties.candleStyle.wickUpColor': '#4caf50',
        'mainSeriesProperties.candleStyle.wickDownColor': '#f44336',
      } : {}
    });
  };

  useEffect(() => {
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
      if (widgetRef.current) {
        widgetRef.current.remove();
        widgetRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (widgetRef.current) {
      widgetRef.current.remove();
      initializeChart();
    }
  }, [theme, symbol]);

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const response = await fetch('https://cex.cryptodevworks.com/api/public/v1/ticker');
        const data = await response.json();
        if (data && data[symbol]) {
          setTickerData(data[symbol]);
        }
      } catch (error) {
        console.error('Error fetching ticker data:', error);
      }
    };

    fetchTickerData();
  }, [symbol]);

  return (
    <div
      id="tv_chart_container"
      ref={chartContainerRef}
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // Updated box shadow to grey
      }}
      className='p-4 h-[300px] md:w-[1250px] md:h-[700px] bg-white rounded-lg shadow-sm dark:bg-card col-span-1 md:col-span-2 px-2 py-3 border-b dark:border-accent flex items-center justify-between md'
    />
  );
};

export default TradingChart;

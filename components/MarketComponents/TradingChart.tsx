"use client";

import React, { useEffect, useRef } from 'react';

const TradingChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/charting_library/charting_library.min.js';
    script.async = true;
    document.body.appendChild(script);

    const datafeedScript = document.createElement('script');
    datafeedScript.src = '/charting_library/datafeeds/udf/dist/bundle.js';
    datafeedScript.async = true;
    document.body.appendChild(datafeedScript);

    script.onload = () => {
      const widget = (window as any).TradingView.widget;

      new widget({
        symbol: 'BTCUSD',
        interval: 'D',
        container_id: chartContainerRef.current?.id,
        datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed('/api/TradingView'),
        library_path: '/charting_library/',
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

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(datafeedScript);
    };
  }, []);

  return <div id="tv_chart_container" ref={chartContainerRef} style={{ height: '500px', width: '100%' }} />;
};

export default TradingChart;

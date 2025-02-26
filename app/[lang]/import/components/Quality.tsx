'use client';

import AOS from 'aos';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { InView } from 'react-intersection-observer';

ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
);

export default function Quality({ data }: any) {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.addEventListener('scroll', AOS.refresh);
    return () => {
      window.removeEventListener('scroll', AOS.refresh);
    };
  }, []);

  const chartData = {
    labels: ['2010.', '2015.', '2020.', '2022.', '2024.'],
    datasets: [
      {
        label: 'Procenat',
        data: [96, 97, 97.58, 98, 98.08],
        backgroundColor: [
          '#7de314',
          '#01cc9b',
          '#14a0c0',
          '#5059ab',
          '#09909f',
        ],
        borderRadius: 10,
        barThickness: 18,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    animation: startAnimation
      ? {
          duration: 3000,
          easing: 'easeOutQuad',
        }
      : false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}%`,
        },
      },
      datalabels: {
        color: (context: any) =>
          context.dataset.backgroundColor[context.dataIndex],
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value) => `${value}%`,
        anchor: 'end',
        align: 'end',
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#086688',
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
          callback: (value) => `${value}%`,
          color: '#086688',
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: false,
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    layout: {
      padding: {
        top: 30,
        bottom: 10,
      },
    },
  };

  return (
    <section className="paddingOutSection">
      <div
        className="roundedSection relative mx-auto w-full max-w-[1760px] overflow-hidden"
        data-aos="fade-up"
      >
        <Image
          src="/images/import/quality/quality.png"
          alt="Quality"
          width={100}
          height={100}
          className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        />
        <div className="paddingInSection relative flex h-full w-full flex-col gap-10 bg-gradient-to-r from-blue via-blue/90 to-blue/20">
          <h2
            dangerouslySetInnerHTML={{ __html: data.quality.titleOne }}
            className="text-white"
          />
          <div className="flex flex-col gap-4">
            {data.quality.description.map(
              (item: { text: string }, index: number) => {
                return (
                  <p key={index} className="responsiveText text-white">
                    {item.text}
                  </p>
                );
              },
            )}
          </div>
          <h2
            dangerouslySetInnerHTML={{ __html: data.quality.titleTwo }}
            className="text-white"
          />
          <div className="flex flex-col gap-10 md:flex-row">
            <InView
              as="div"
              onChange={(inView) => {
                if (inView) setStartAnimation(true);
              }}
              triggerOnce={true}
              className="flex w-full flex-1 items-center justify-center rounded-2xl bg-white p-2 sm:p-4"
            >
              <Bar
                data={chartData}
                options={options}
                key={startAnimation ? 'animated' : 'static'}
              />
            </InView>
            <div className="flex w-full flex-1 justify-center rounded-2xl bg-white px-6">
              <Image
                src="/images/import/quality/certification.png"
                alt="Certification"
                width={100}
                height={100}
                className="w-full max-w-[600px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Head from '@docusaurus/Head'
import HeroImg from '../../static/img/HomePage.png'

import styles from './index.module.css';

/*原本的HomepageHeader函数文件*/ 
/*function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}
        </h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            自我介绍
          </Link>
        </div>
      </div>
    </header>
  );
}*/
const svgList = [
  {
    title: 'github',
    Svg: require('../../static/img/github.svg').default,
    color: 'black',
    link: 'https://github.com/DxIMT',
  },
  {
    title: 'bilibili',
    Svg: require('../../static/img/bilibili.svg').default,
    link: 'https://space.bilibili.com/481621384?spm_id_from=333.1007.0.0',
  },
  {
    title: 'wechat',
    Svg: require('../../static/img/WeChat.svg').default,
    color: '#2979ff',
    link: 'https://postimg.cc/9rN4nx8X',
  },
  /*{
    title: 'cloud_music',
    Svg: require('../../static/img/cloud-music.svg').default,
    color: '#2979ff',
    link: 'https://music.163.com/#/user/home?id=557006813',
  },*/
]

const Svg = ({ Svg, color, title, link }) => {
  return (
    <a href={link} target='_blank'>
      <Svg className={styles.svg} style={{ fill: color }} />
    </a>
  )
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className={styles.myHeroContainer}>
      <div className={styles.leftContainer}>
        <h1 className={styles.leftContainer_h1}>
        Hello！ <br />这里是🎥啵贝琴的小站💭
        </h1>
        <p className={styles.leftContainer_p}>
        ➡ 这是属于啵贝琴的专属网页；记录自己学习的历程以及感悟。
        <br />
        <br />
        ◻️ “困住你的到底是什么?”
        <br />
        ◻️ “是已有的认知。”
        </p>
        <div className={styles.buttonContainer}>
          {/* <button className={styles.button}>
            <a className={styles.hero_a} href='/'>
              Click
            </a>
          </button>
          <span className={styles.buttonLeftText}>
            Get Started. <br /> 开启学习之旅.
          </span> */}
          
          <div className={styles.svgContainer}>
            {svgList.map((item, index) => {
              return <Svg {...item} key={item.title} />
            })}
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <img src={HeroImg} alt='HeroImg'/>
      </div>
    </div>
  )
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`欢迎来到`}
      >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

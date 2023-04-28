import { useState } from "react";
import styles from "./sort-posts.module.css";

const OrderBy = ({ tabIndex, activeIndex, setActiveTab, children }: any) => {
  const handleClick = () => {
    setActiveTab(tabIndex);
  };

  return (
    <div
      className={tabIndex === activeIndex ? `${styles.order} ${styles.active}` : styles.order}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

const SortPosts = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.sortPosts}>
      <OrderBy tabIndex={0} activeIndex={activeTab} setActiveTab={setActiveTab}>
        <i className="fa-solid fa-rocket"></i>
        <p>Best</p>
      </OrderBy>
      <OrderBy tabIndex={1} activeIndex={activeTab} setActiveTab={setActiveTab}>
        <i className="fa-solid fa-fire"></i>
        <p>Hot</p>
      </OrderBy>
      <OrderBy tabIndex={2} activeIndex={activeTab} setActiveTab={setActiveTab}>
        <i className="fa-solid fa-sun"></i>
        <p>New</p>
      </OrderBy>
      <OrderBy tabIndex={3} activeIndex={activeTab} setActiveTab={setActiveTab}>
        <i className="fa-solid fa-hand-point-up"></i>
        <p>Top</p>
      </OrderBy>
    </div>
  );
};

export default SortPosts;

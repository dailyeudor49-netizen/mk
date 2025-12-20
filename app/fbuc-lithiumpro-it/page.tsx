import LandingPage from "./components/LandingPage";

// Network Click Pixel placeholder - update with actual values
const NETWORK_CLICK_PIXEL = {
  offer: 'LITHIUMPRO_IT_OFFER_ID',
  uid: 'LITHIUMPRO_IT_UID',
  lp: 'LITHIUMPRO_IT_LP_ID',
};

export default function Home() {
  return (
    <>
      {/* Network Click Pixel - UPDATE VALUES */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://offers.uncappednetwork.com/forms/api/ck/?o=${NETWORK_CLICK_PIXEL.offer}&uid=${NETWORK_CLICK_PIXEL.uid}&lp=${NETWORK_CLICK_PIXEL.lp}`}
        style={{width:'1px',height:'1px',display:'none'}}
        alt=""
      />
      <LandingPage />
    </>
  );
}

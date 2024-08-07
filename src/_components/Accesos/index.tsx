import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

interface ListProps {
  text: string;
  url: string;
}

const List: React.FC<ListProps> = ({ text, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="mb-5 flex items-center text-lg font-medium text-body-color hover:text-primary transition-colors duration-200"
  >
    <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
      {checkIcon}
    </span>
    {text}
  </a>
);

const Accesos: React.FC = () => {
  return (
    <section id="about" className="pt-20 md:pt-5 lg:pt-5">
      <div className="container mx-auto px-2">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center justify-center">
            <div className="w-full px-2 lg:w-1/3">
              <SectionTitle
                title="Accesos Directos"
                paragraph=""
                mb="44px"
              />

              <div
                className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0"
                data-wow-delay=".15s"
              >
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-4 sm:w-1/1 lg:w-1/2">
                    <List
                      text="HotSos"
                      url="https://na4.m-tech.com/hotsos/app/index?#/login"
                    />
                    <List
                      text="Salto"
                      url="http://10.11.124.66:8100/index.html#!/home"
                    />
                    <List
                      text="Succes Factor"
                      url="https://hcm19.sapsf.com/login?company=experienci&username=6975#/login"
                    />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-1/2">
                    <List
                      text="Sales Force"
                      url="https://xcaret.my.salesforce.com/?locale=mxe"
                    />
                    <List
                      text="Service Now"
                      url="https://gxcaretprod.service-now.com/sp?id=index"
                    />
                    <List
                      text="Saturno"
                      url="http://xcsissatadm:8081/"
                    />
                    <List
                      text="Opera Cloud"
                      url="https://mtcu5.oraclehospitality.us-ashburn-1.ocs.oraclecloud.com/OPERA9/opera/operacloud"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accesos;

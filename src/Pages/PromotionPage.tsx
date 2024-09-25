import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PromotionService from "../Services/OnePageServices";
import i18n, { _get_i18Lang } from "../i18n";
import { Breadcrumbs } from "./E-BooksComponent";
import { useNavigate } from "react-router-dom";

const PromotionPage = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [promoData, setPromoData] = useState<any[] | undefined>(undefined);

    useEffect(() => {
        PromotionService.getPromotionPageData(_get_i18Lang()).then((res) => {
            if (res.status) {
                setPromoData(res?.result)
            }
        });
    }, [i18n.language])

    return (
        <div style={{ marginBottom: "20px" }}>
            <Breadcrumbs
                mainsubBreadCrumb={t("promotion_tr")}
                subBreadCrumb={t("Home_tr")}
                navigatemainsubBreadCrumb={() => {
                    navigate(`/home`);
                }}
                subBreadCrumbTwo={t("promotion_tr")}
                navigatesubBreadCrumb={() => {
                }}
            />
            <div className="container">
                {promoData?.map((data: any) => (
                    <div key={data?.id}>
                        {
                            data?.promotionContent === null ?
                                ""
                                : <div dangerouslySetInnerHTML={{ __html: data?.promotionContent }} style={{ background: "rgb(255, 246, 225)", boxShadow: "rgb(245, 222, 177) 0px 0px 7px 1px", padding: "15px 20px 0px", marginTop: "20px" }} />
                        }
                    </div>
                )
                )}
            </div>
            <div className="container">
                <div className="row">
                    {promoData?.map((showdata: any) => {
                        return (
                            <div className="col-3" style={{ textAlign: "center" }} key={showdata?.id}>
                                <a href={showdata?.pdfPath}
                                    //  open pdf in new tab
                                     target="_blank" 
                                    title="pdf" rel="noopener noreferrer">
                                    <img src={showdata?.promotionThumbPath} alt="" style={{ width: "60%", marginTop: "30px", height: "75%" }} />
                                    <h6 style={{ fontFamily: 'ChanakyaUniBold', fontSize: "18px", margin: "10px 0 0 0", color: "#3f220d" }}>{showdata?.name}</h6>
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default PromotionPage;
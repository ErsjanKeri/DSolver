import {
   AppstoreOutlined,
   BarChartOutlined,
   CloudOutlined,
   RedoOutlined,
   ShopOutlined,
   TeamOutlined,
   UploadOutlined,
   UserOutlined,
   FireOutlined,
   ForkOutlined,
   NodeIndexOutlined,
   NumberOutlined,
   InsertRowRightOutlined,
   GatewayOutlined ,
   PartitionOutlined,
   VideoCameraOutlined,
   TableOutlined,
   GithubOutlined,
   ApartmentOutlined,
   SwapOutlined
 } from '@ant-design/icons';

import i18next, { t } from 'i18next';
import translation from "./translation.json"

import EEA from "./components/EEA/EEA"
import DPLL from "./components/DPLL/DPLL"
import RelationalesProdukt from "./components/RelationalesProdukt/RelationalesProdukt"

import Matching from "./components/Matching/Matching"
import HavelHakimi from "./components/HavelHakimi/HavelHakimi"
import TruthTable from "./components/TruthTable/TruthTable"
import Groups from "./components/Groups/Groups"
import Kombinatorik from "./components/Kombinatorik"
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init(translation)

let language = "de"
if(localStorage.getItem("lang") !== null){
  language = localStorage.getItem("lang")
}
i18next.changeLanguage(language)


export const routes = [
   {
      link      : "/eea", 
      img_src   : 'eea.png',
      sidebar_title : "EEA",
      homepage_title     : i18next.t("eea"),
      sidebar_icon : <InsertRowRightOutlined />, 
      component : <EEA/>, 
   },
   {
      link      : "/dpll", 
      img_src   : 'dpll.png',
      sidebar_title : "DPLL",
      homepage_title: i18next.t("dpll"),
      sidebar_icon : <ApartmentOutlined />, 
      component : <DPLL/>, 
   },
   {
      link      : "/relations", 
      img_src   : 'relation.png',
      sidebar_title : i18next.t("relational-product-short"),
      homepage_title     : i18next.t("relational-product"),
      sidebar_icon : <GatewayOutlined />, 
      component : <RelationalesProdukt/>, 
   },
   {
      link      : "/matching", 
      img_src   : 'matching.png',
      sidebar_title : i18next.t("matching-short"),
      homepage_title: i18next.t("matching"),
      sidebar_icon : <SwapOutlined />, 
      component : <Matching/>, 
   },

   {
      link      : "/havelhakimi", 
      img_src   : 'hakimi.png',
      sidebar_title : i18next.t("havel-hakimi-short"),
      homepage_title     : i18next.t("havel-hakimi"),
      sidebar_icon : <NodeIndexOutlined />, 
      component : <HavelHakimi/>, 
   },
   {
      link      : "/truthtable", 
      img_src   : 'truthtable.png',
      sidebar_title : i18next.t("truth-table"),
      homepage_title: i18next.t("truth-table"),
      sidebar_icon : <TableOutlined />, 
      component : <TruthTable />, 
   },
   {
      link      : "/algebra", 
      img_src   : 'groups.png',
      sidebar_title : i18next.t("group-theory"),
      homepage_title: i18next.t("group-theory"),
      sidebar_icon : <RedoOutlined />, 
      component : <Groups />, 
   },

   {
      link      : "/combinatorics", 
      img_src   : 'kombinatorik.png',
      sidebar_title : i18next.t("combinatorics"),
      homepage_title: i18next.t("combinatorics"),
      sidebar_icon : <NumberOutlined />, 
      component : <Kombinatorik />, 
   },
   
   
   

]

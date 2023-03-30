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

import EEA from "./components/EEA/EEA"
import DPLL from "./components/DPLL/DPLL"
import RelationalesProdukt from "./components/RelationalesProdukt/RelationalesProdukt"

import Matching from "./components/Matching/Matching"
import HavelHakimi from "./components/HavelHakimi/HavelHakimi"
import TruthTable from "./components/TruthTable/TruthTable"
import Groups from "./components/Groups/Groups"
import Kombinatorik from "./components/Kombinatorik"


export const routes = [
   {
      link      : "/eea", 
      img_src   : 'eea.png',
      sidebar_title : "EEA",
      homepage_title     : "Erweiterter Euklidischer Algorithmus",
      sidebar_icon : <InsertRowRightOutlined />, 
      component : <EEA/>, 
   },
   {
      link      : "/dpll", 
      img_src   : 'dpll.png',
      sidebar_title : "DPLL",
      homepage_title     : "DPLL",
      sidebar_icon : <ApartmentOutlined />, 
      component : <DPLL/>, 
   },
   {
      link      : "/relation", 
      img_src   : 'dpll.png',
      sidebar_title : "Relationen",
      homepage_title     : "Relationales Produkt",
      sidebar_icon : <GatewayOutlined />, 
      component : <RelationalesProdukt/>, 
   },
   {
      link      : "/matching", 
      img_src   : 'matching.png',
      sidebar_title : "Matching",
      homepage_title     : "Matching",
      sidebar_icon : <SwapOutlined />, 
      component : <Matching/>, 
   },

   {
      link      : "/havelhakimi", 
      img_src   : 'dpll.png',
      sidebar_title : "Havel-Hakimi",
      homepage_title     : "Havel-Hakimi",
      sidebar_icon : <NodeIndexOutlined />, 
      component : <HavelHakimi/>, 
   },
   {
      link      : "/wahrheitstabelle", 
      img_src   : 'truthtable.png',
      sidebar_title : "Wahrheitstabelle",
      homepage_title     : "Wahrheitstabelle",
      sidebar_icon : <TableOutlined />, 
      component : <TruthTable />, 
   },
   {
      link      : "/algebra", 
      img_src   : 'groups.png',
      sidebar_title : "Algebra Gruppen",
      homepage_title     : "Algebra Gruppen",
      sidebar_icon : <RedoOutlined />, 
      component : <Groups />, 
   },

   {
      link      : "/kombinatorik", 
      img_src   : 'kombinatorik.png',
      sidebar_title : "Kombinatorik",
      homepage_title     : "Kombinatorik",
      sidebar_icon : <NumberOutlined />, 
      component : <Kombinatorik />, 
   },

]
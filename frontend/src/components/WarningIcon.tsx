import React, { useEffect } from "react";
import lottie from "lottie-web";

const data = {"v":"5.4.4","fr":29.9700012207031,"ip":0,"op":80.0000032584668,"w":500,"h":500,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":3,"nm":"Adjustment Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[250,250,0],"ix":2},"a":{"a":0,"k":[250,250,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":0,"s":[0,0,100],"e":[130,130,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":6.333,"s":[130,130,100],"e":[100,100,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":11.833,"s":[100,100,100],"e":[120,120,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":16.418,"s":[120,120,100],"e":[110,110,100]},{"t":19.1675007807083}],"ix":6}},"ao":0,"ip":0,"op":900.000036657751,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"stroke","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":48,"s":[0],"e":[-4]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":50.25,"s":[-4],"e":[3]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":52.5,"s":[3],"e":[-2]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":54.75,"s":[-2],"e":[4]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":57,"s":[4],"e":[0]},{"t":60.0000024438501}],"ix":10},"p":{"a":0,"k":[258.75,237,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[110,110,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-7.104,12.304],[0,0],[0,0],[-7.104,-12.304],[0,0],[0,0],[14.207,0]],"o":[[0,0],[-14.207,0],[0,0],[0,0],[7.104,-12.304],[0,0],[0,0],[7.104,12.304],[0,0]],"v":[[0,105.676],[-98.937,105.676],[-114.92,77.992],[-65.452,-7.69],[-15.983,-93.372],[15.983,-93.372],[65.452,-7.69],[114.921,77.992],[98.937,105.676]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":14,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":900.000036657751,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"Shape Layer 3","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":12,"s":[258.75,268.805,0],"e":[258.75,283.75,0],"to":[0,2.491,0],"ti":[0,-2.491,0]},{"t":23.0000009368092}],"ix":2},"a":{"a":0,"k":[16,38,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":16,"s":[91.667,0,100],"e":[91.667,99,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":23.555,"s":[91.667,99,100],"e":[91.667,93.5,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":29.223,"s":[91.667,93.5,100],"e":[91.667,91.63,100]},{"t":33.0000013441176}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-8.284,0],[0,-8.284],[8.284,0],[0,8.284]],"o":[[8.284,0],[0,8.284],[-8.284,0],[0,-8.284]],"v":[[0,-15],[15,0],[0,15],[-15,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0,0,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[16,53],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":900.000036657751,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"Shape Layer 2","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[258.75,271.1,0],"ix":2},"a":{"a":0,"k":[0,76.865,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":18,"s":[50.417,0,100],"e":[50.417,55,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":22,"s":[50.417,55,100],"e":[50.417,47.3,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":26,"s":[50.417,47.3,100],"e":[50.417,50.38,100]},{"t":30.0000012219251}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[1.327,29.458],[0,0],[2.522,-56],[-6.482,-25.766],[-4.199,16.689]],"o":[[-2.522,-56],[0,0],[-1.327,29.458],[4.199,16.689],[6.482,-25.766]],"v":[[23.327,-25.037],[0,-78.037],[-23.327,-25.037],[-11.647,64.349],[11.647,64.349]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0,0,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":900.000036657751,"st":0,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"body","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":27,"s":[0],"e":[5]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":29.728,"s":[5],"e":[-3]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":32.455,"s":[-3],"e":[2]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":35.183,"s":[2],"e":[-5]},{"i":{"x":[0.4],"y":[0.4]},"o":{"x":[0.333],"y":[0]},"t":37.91,"s":[-5],"e":[0]},{"t":42.0000017106951}],"ix":10},"p":{"a":0,"k":[249.583,248.917,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[110,110,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-7.104,12.304],[0,0],[0,0],[-7.104,-12.304],[0,0],[0,0],[14.207,0]],"o":[[0,0],[-14.207,0],[0,0],[0,0],[7.104,-12.304],[0,0],[0,0],[7.104,12.304],[0,0]],"v":[[0,105.676],[-98.937,105.676],[-114.92,77.992],[-65.452,-7.69],[-15.983,-93.372],[15.983,-93.372],[65.452,-7.69],[114.921,77.992],[98.937,105.676]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[1,0.78394464231,0.125490188599,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":900.000036657751,"st":0,"bm":0}],"markers":[]}
const WarningIcon: React.FC = () => {
  const container = React.useRef<HTMLDivElement>(null);

  let loaded = false

  useEffect(() => {
    if (!loaded) {
      lottie.loadAnimation({
        container: container.current as HTMLDivElement,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: data,
      });
      loaded = true
    }
  }, []);

  return (<div ref={container} className="warning-icon" />);
}

export default WarningIcon;
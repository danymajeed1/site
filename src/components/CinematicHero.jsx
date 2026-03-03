import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./CinematicHero.css";

import weddingImg    from "../assets/images/wedding2.webp";
import realEstateImg from "../assets/images/realestate-cover.jpg";
import portraitImg   from "../assets/images/portrait.jpg";
import eventsImg     from "../assets/images/events.jpg";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// ── HIGH-PERFORMANCE, SMOOTH PHYSICS ENGINE ──────────
function hash2(xi, yi) {
  let h = (Math.imul((xi + 4096)|0, 1619) + Math.imul((yi + 4096)|0, 31337))|0;
  h ^= h >>> 16; h = Math.imul(h, 0x45d9f3b); h ^= h >>> 16;
  return (h >>> 0) / 0xffffffff;
}
function sn(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const ux = fx*fx*fx*(fx*(fx*6-15)+10);
  const uy = fy*fy*fy*(fy*(fy*6-15)+10);
  const a=hash2(ix,iy), b=hash2(ix+1,iy), c=hash2(ix,iy+1), d=hash2(ix+1,iy+1);
  return a+(b-a)*ux+(c-a)*uy+(a-b-c+d)*ux*uy;
}
function fbm3(x, y) {
  return (sn(x,y)*0.57 + sn(x*2.1, y*2.1)*0.28 + sn(x*4.3, y*4.3)*0.15);
}

// Slow, majestic morphing (No vibration)
function livingFbm(x, y, t) {
  const qx = sn(x + t * 0.05, y + t * 0.05);
  const qy = sn(x + 1.2, y + 2.8 + t * 0.05);
  const rx = sn(x + 2.5 * qx + 1.7 + t * 0.08, y + 2.5 * qy + 9.2 + t * 0.08);
  const ry = sn(x + 2.5 * qx + 8.3 + t * 0.08, y + 2.5 * qy + 2.8 + t * 0.08);
  return fbm3(x + 2.5 * rx, y + 2.5 * ry);
}

// ── MARCHING SQUARES ENGINE ───────────────────────────────────
const MS = [[],[[2,3]],[[1,2]],[[1,3]],[[0,1]],[[0,1],[2,3]],[[0,2]],[[0,3]],[[0,3]],[[0,2]],[[0,3],[1,2]],[[0,1]],[[1,3]],[[1,2]],[[2,3]],[]];
const CRN = [[0,0],[1,0],[1,1],[0,1]];
const EDG = [[0,1],[1,2],[3,2],[0,3]];

function buildChains(segs) {
  const n = segs.length; if (!n) return [];
  const K = (x,y) => `${(x*8)|0},${(y*8)|0}`;
  const map = new Map();
  for (let i = 0; i < n; i++) {
    const [a,b] = segs[i];
    const ka=K(a[0],a[1]), kb=K(b[0],b[1]);
    if (!map.has(ka)) map.set(ka,[]);
    if (!map.has(kb)) map.set(kb,[]);
    map.get(ka).push(i<<1); map.get(kb).push((i<<1)|1);
  }
  const used=new Uint8Array(n), chains=[];
  for (let s=0; s<n; s++) {
    if (used[s]) continue; used[s]=1;
    const chain=[segs[s][0],segs[s][1]];
    let tail=chain[chain.length-1];
    while(true){
      const nb=map.get(K(tail[0],tail[1])); if(!nb) break;
      let f=false;
      for(const p of nb){const idx=p>>1,e=p&1;if(used[idx])continue;used[idx]=1;tail=e===1?segs[idx][0]:segs[idx][1];chain.push(tail);f=true;break;}
      if(!f) break;
    }
    let head=chain[0];
    while(true){
      const nb=map.get(K(head[0],head[1])); if(!nb) break;
      let f=false;
      for(const p of nb){const idx=p>>1,e=p&1;if(used[idx])continue;used[idx]=1;head=e===0?segs[idx][1]:segs[idx][0];chain.unshift(head);f=true;break;}
      if(!f) break;
    }
    if (chain.length>=3) chains.push(chain);
  }
  return chains;
}

function drawSpline(ctx, pts) {
  const n=pts.length; if(n<2)return;
  ctx.moveTo(pts[0][0],pts[0][1]);
  if(n===2){ctx.lineTo(pts[1][0],pts[1][1]);return;}
  for(let i=0;i<n-1;i++){
    const p0=pts[Math.max(0,i-1)], p1=pts[i], p2=pts[i+1], p3=pts[Math.min(n-1,i+2)];
    // Perfect 0.5 tension for flawless curves
    ctx.bezierCurveTo(p1[0]+0.5*(p2[0]-p0[0])/2, p1[1]+0.5*(p2[1]-p0[1])/2, p2[0]-0.5*(p3[0]-p1[0])/2, p2[1]-0.5*(p3[1]-p1[1])/2, p2[0], p2[1]);
  }
}

// 7 Elegant Layers (Subtle, not overcrowded)
const ISO = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];

function TopoCanvas() {
  const canvasRef = useRef(null);
  useEffect(()=>{
    const canvas=canvasRef.current;
    const ctx=canvas.getContext("2d", { alpha: false });
    let rafId;

    const resize=()=>{
      // Hard cap at 1.25 to guarantee 60fps on big screens
      const dpr=Math.min(window.devicePixelRatio||1, 1.25); 
      canvas.width =canvas.offsetWidth *dpr; canvas.height=canvas.offsetHeight*dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    resize();
    const ro=new ResizeObserver(resize); ro.observe(canvas);

    let field=new Float32Array(90*60);
    const draw=(ts)=>{
      const W=canvas.offsetWidth, H=canvas.offsetHeight;
      if(!W||!H){rafId=requestAnimationFrame(draw);return;}
      const mobile=W<768;
      
      // OPTIMIZED GRID: Solves the lag immediately while staying smooth
      const GW=mobile?45:80; const GH=mobile?30:50; 
      const needed=(GW+1)*(GH+1);
      if(field.length<needed) field=new Float32Array(needed);

      // VERY SLOW SPEED: Cinematic drift
      const t=ts*0.00004;
      const tX=t*0.5, tY=t*0.3; 
      const NSX=mobile?1.4:1.8, NSY=mobile?1.0:1.3;

      // Dark moody background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0,0,W,H);

      for(let j=0;j<=GH;j++){
        const gy=j/GH, row=j*(GW+1);
        for(let i=0;i<=GW;i++){
          const gx=i/GW;
          field[row+i]=livingFbm(gx*NSX+tX, gy*NSY+tY, t*0.2);
        }
      }

      const cW=W/GW, cH=H/GH;
      ctx.globalCompositeOperation = "screen";

      for(let li=0;li<ISO.length;li++){
        const iso=ISO[li];
        const isIdx=li%2===0;
        const elev=1-Math.abs(iso-0.5)/0.5;
        const pulse=0.9+0.1*Math.sin(ts*0.0005+li);
        
        // --- SUBTLETY UPGRADE ---
        // Opacity severely capped. Very ghost-like.
        const baseAlpha = isIdx ? 0.12 : 0.05;
        const alpha = clamp(baseAlpha*(0.8+elev*1.0)*pulse, 0.01, 0.18);

        const segs=[];
        for(let j=0;j<GH;j++){
          const r0=j*(GW+1), r1=(j+1)*(GW+1);
          for(let i=0;i<GW;i++){
            const vTL=field[r0+i], vTR=field[r0+i+1], vBR=field[r1+i+1], vBL=field[r1+i];
            const idx=(vTL>iso?8:0)|(vTR>iso?4:0)|(vBR>iso?2:0)|(vBL>iso?1:0);
            const cases=MS[idx]; if(!cases.length) continue;
            const cv=[vTL,vTR,vBR,vBL];
            for(const [eA,eB] of cases){
              const [ca0,ca1]=EDG[eA], [cb0,cb1]=EDG[eB];
              const tA=clamp((iso-cv[ca0])/((cv[ca1]-cv[ca0])||1e-9),0,1);
              const tB=clamp((iso-cv[cb0])/((cv[cb1]-cv[cb0])||1e-9),0,1);
              segs.push([
                [(i+CRN[ca0][0]+tA*(CRN[ca1][0]-CRN[ca0][0]))*cW, (j+CRN[ca0][1]+tA*(CRN[ca1][1]-CRN[ca0][1]))*cH],
                [(i+CRN[cb0][0]+tB*(CRN[cb1][0]-CRN[cb0][0]))*cW, (j+CRN[cb0][1]+tB*(CRN[cb1][1]-CRN[cb0][1]))*cH]
              ]);
            }
          }
        }
        if(!segs.length) continue;
        const chains=buildChains(segs);
        
        ctx.beginPath();
        // Cool, muted steel blue (not white)
        // ctx.strokeStyle=`rgba(150, 170, 200, ${alpha})`;
        // Change from the bright (200,215,255) to a darker, stealthy color
        ctx.strokeStyle = `rgba(100, 120, 160, ${alpha})`;
        // Thinner, sharper lines
        ctx.lineWidth = isIdx ? (mobile ? 1.0 : 1.2) : (mobile ? 0.6 : 0.8);
        ctx.lineJoin="round"; ctx.lineCap="round";
        
        for(const chain of chains) drawSpline(ctx,chain);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
      rafId=requestAnimationFrame(draw);
    };
    rafId=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(rafId);ro.disconnect();};
  },[]);

  return <canvas ref={canvasRef} aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%",display:"block",pointerEvents:"none",zIndex:0}}/>;
}

const AUTO_MS = 8500; 

export default function CinematicHero() {
  const navigate=useNavigate();
  const shots=useMemo(()=>[
    {id:"weddings",   label:"Weddings",    title:"Cinematic Stories.",       sub:"Editorial emotion. Film-inspired color.",    img:weddingImg   },
    {id:"realestate", label:"Real Estate", title:"Architectural Precision.", sub:"HDR balance. Detail that sells.",            img:realEstateImg},
    {id:"portraits",  label:"Portraits",   title:"Modern Design.",           sub:"Personal branding with direction.",          img:portraitImg  },
    {id:"events",     label:"Events",      title:"Clean Coverage.",          sub:"Dynamic moments captured consistently.",     img:eventsImg    },
  ],[]);

  const [active, setActive]=useState(0);
  const [shutter, setShutter ]=useState(false);
  const [progress, setProgress]=useState(0);
  const [hover, setHover]=useState(false);
  const userPaused=useRef(false);

  useEffect(()=>{
    let start=performance.now(), raf;
    const tick=(now)=>{
      if(!userPaused.current){
        const p=Math.min((now-start)/AUTO_MS,1); setProgress(p);
        if(p>=1){setActive(a=>(a+1)%shots.length); start=now; setProgress(0);}
      }
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(raf);
  },[shots.length]);

  const selectShot=useCallback((i)=>{
    userPaused.current=true; setActive(i); setProgress(0);
    setTimeout(()=>{userPaused.current=false;},10000);
  },[]);

  return (
    <section className="hero9">
      <TopoCanvas/>
      <div className="hero9bg" aria-hidden="true">
        <div className="hero9bg__auras"/>
        <div className="hero9bg__noise"/>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} aria-hidden="true" className="hero9__ghostNum"
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1.4}}>
          {String(active+1).padStart(2,"0")}
        </motion.div>
      </AnimatePresence>

      <motion.div className="hero9__frame" initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:1.2,ease:[0.16,1,0.3,1]}}>
        <div className="hero9__posterWrap">
          {/* 1. TACTILE SQUISH: Pushes the whole poster in when pressed on mobile */}
          <motion.div whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
            
            {/* 2. GYROSCOPE ENABLED: The image will now tilt as you move your phone */}
            <Tilt 
              tiltEnable 
              trackOnWindow={false} 
              tiltMaxAngleX={6} 
              tiltMaxAngleY={6} 
              perspective={1400} 
              scale={1.0} 
              transitionSpeed={1500} 
              gyroscope={true} 
              className="hero9__tiltWrap"
            >
              <div 
                className={`hero9__poster ${hover ? "is-hover" : ""}`} 
                onPointerEnter={() => setHover(true)} 
                onPointerLeave={() => setHover(false)}
                onTouchStart={() => setHover(true)}
                onTouchEnd={() => setHover(false)}
                onTouchCancel={() => setHover(false)}
              >
                
                {/* ─── NEW: MOBILE HINT PILL ─── */}
                <div className="hero9__mobileHint">Hold for Color</div>

                {/* SMOOTH CROSSFADE FIX */}
                <AnimatePresence mode="wait">
                  <motion.div key={shots[active].id} className="hero9__img-group" initial={{opacity:0, scale:1.05}} animate={{opacity:1, scale:1.0}} exit={{opacity:0}} transition={{duration:1.2}}>
                    <img src={shots[active].img} alt={shots[active].label} className="hero9__img hero9__img--bw" />
                    <img src={shots[active].img} alt="" className="hero9__img hero9__img--col" />
                  </motion.div>
                </AnimatePresence>
                
                <div className="hero9__gloss" aria-hidden="true"/>
                <div className="hero9__vignette" aria-hidden="true"/>
                <div className="hero9__scanlines" aria-hidden="true"/>
                <div className="hero9__tag"><span className="h-tag-line"/>{shots[active].label}</div>
                <div className="hero9__exif" aria-hidden="true"><span>f/1.8</span><span>1/200s</span><span>ISO 400</span></div>
              </div>
            </Tilt>
          </motion.div>
          <div className="hero9__floatShadow"/>
        </div>

        <div className="hero9__copy">
          <motion.div className="hero9__kicker" initial={{opacity:0,x:-22}} animate={{opacity:1,x:0}} transition={{delay:0.3,duration:0.85}}>
            DANY MAJEED <span className="k-slash">{"//"}</span> PRODUCTIONS
          </motion.div>

          <div className="hero9__textMask">
            <AnimatePresence mode="wait">
              <motion.h1 key={shots[active].title} className="hero9__title" initial={{opacity:0,y:36,filter:"blur(8px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} exit={{opacity:0,y:-20,filter:"blur(8px)"}} transition={{duration:0.95}}>
                {shots[active].title}
              </motion.h1>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.p key={shots[active].sub} className="hero9__sub" initial={{opacity:0,y:9}} animate={{opacity:1,y:0}} transition={{duration:0.65,delay:0.06}}>
              {shots[active].sub}
            </motion.p>
          </AnimatePresence>

          <div className="hero9__actions">
            <button className="hero9__btn hero9__btnPrimary" onClick={()=>{setShutter(true); setTimeout(()=>navigate("/portfolio"),580);}}>Showcase</button>
            <a className="hero9__btn hero9__btnGhost" href="#contact">Inquire</a>
          </div>

          <div className="hero9__sheet" aria-label="Select category">
            {shots.map((s,i)=>(
              <button key={s.id} className={`hero9__thumb ${i===active?"is-active":""}`} onClick={()=>selectShot(i)} type="button">
                <div className="thumb-frame"><img src={s.img} alt={s.label} loading="lazy"/><div className="thumb-glare"/></div>
                <div className="thumb-meta"><span className="thumb-num">0{i+1}</span><span className="thumb-label">{s.label}</span></div>
                <div className="thumb-progress"><div className="tp-fill" style={{transform:`scaleX(${i===active?progress:0})`,transformOrigin:"left",transition:"none"}}/></div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="hero9__blend" aria-hidden="true"/>

      <AnimatePresence>
        {shutter&&(
          <motion.div className="hero9__shutter" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <motion.div className="s-circle" initial={{scale:0}} animate={{scale:3}} transition={{duration:0.6,ease:"circIn"}}/><motion.div className="s-flash" initial={{opacity:0}} animate={{opacity:[0,1,0]}} transition={{delay:0.4,duration:0.3}}/>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
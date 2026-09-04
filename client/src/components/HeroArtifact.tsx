/**
 * Terminal Monograph design reminder: the 3D artifact is an engineered object—quiet graphite planes, one Build Lime signal, and no ornamental spectacle.
 */
import { useEffect, useRef, useState } from "react";

type HeroArtifactProps = {
  reducedMotion: boolean;
};

export default function HeroArtifact({ reducedMotion }: HeroArtifactProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglActive, setWebglActive] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || reducedMotion) return;

    let disposed = false;
    let cleanUp = () => undefined;

    void import("three").then((THREE) => {
      if (disposed) return;

      let animationFrame = 0;
      let renderer: import("three").WebGLRenderer | undefined;
      let resizeObserver: ResizeObserver | undefined;
      let visibilityObserver: IntersectionObserver | undefined;
      let isVisible = true;

      try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 100);
        camera.position.set(0, 0.15, 6.25);

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.setAttribute("aria-hidden", "true");
        renderer.domElement.style.display = "block";
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        mount.appendChild(renderer.domElement);

        const artifact = new THREE.Group();
        artifact.rotation.set(0.23, -0.3, -0.08);
        scene.add(artifact);

        const graphite = new THREE.LineBasicMaterial({ color: 0x526057, transparent: true, opacity: 0.76 });
        const dimGraphite = new THREE.LineBasicMaterial({ color: 0x2e3832, transparent: true, opacity: 0.72 });
        const lime = new THREE.LineBasicMaterial({ color: 0xc6ff3f, transparent: true, opacity: 0.96 });
        const moduleGeometry = new THREE.BoxGeometry(2.65, 0.42, 1.38);

        [-0.86, 0, 0.86].forEach((y, index) => {
          const module = new THREE.LineSegments(new THREE.EdgesGeometry(moduleGeometry), index === 1 ? graphite : dimGraphite);
          module.position.set((index - 1) * 0.14, y, (index - 1) * 0.16);
          module.rotation.y = (index - 1) * 0.17;
          artifact.add(module);
        });

        const signalPath = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-1.45, -1.12, 0.3),
          new THREE.Vector3(-0.4, -0.46, 0.6),
          new THREE.Vector3(0.28, 0.25, 0.55),
          new THREE.Vector3(1.32, 1.06, 0.12),
        ]);
        artifact.add(new THREE.Line(signalPath, lime));

        const marker = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, 0.16, 0.16),
          new THREE.MeshBasicMaterial({ color: 0xc6ff3f }),
        );
        marker.position.set(-0.4, -0.46, 0.6);
        artifact.add(marker);

        const halo = new THREE.LineLoop(
          new THREE.CircleGeometry(2.35, 72).rotateX(Math.PI / 2),
          new THREE.LineBasicMaterial({ color: 0x334037, transparent: true, opacity: 0.45 }),
        );
        halo.position.y = -1.26;
        artifact.add(halo);

        const pointer = { x: 0, y: 0 };
        const onPointerMove = (event: PointerEvent) => {
          if (event.pointerType === "touch" || event.pointerType === "pen") return;
          const rect = mount.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          pointer.x = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5));
          pointer.y = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5));
        };
        const onPointerLeave = () => { pointer.x = 0; pointer.y = 0; };
        mount.addEventListener("pointermove", onPointerMove, { passive: true });
        mount.addEventListener("pointerleave", onPointerLeave, { passive: true });
        mount.addEventListener("pointercancel", onPointerLeave, { passive: true });

        const resize = () => {
          const bounds = mount.getBoundingClientRect();
          const width = Math.max(1, Math.round(bounds.width || mount.clientWidth || 460));
          const height = Math.max(1, Math.round(bounds.height || mount.clientHeight || width * 1.25));
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer?.setSize(width, height, false);
        };
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);
        visibilityObserver = new IntersectionObserver(([entry]) => {
          isVisible = Boolean(entry?.isIntersecting);
        }, { rootMargin: "120px" });
        visibilityObserver.observe(mount);
        window.addEventListener("resize", resize, { passive: true });
        resize();
        window.requestAnimationFrame(resize);

        const startTime = performance.now();
        const render = () => {
          const elapsed = (performance.now() - startTime) / 1000;
          artifact.rotation.y += ((-0.3 + pointer.x * 0.6 + Math.sin(elapsed * 0.34) * 0.08) - artifact.rotation.y) * 0.032;
          artifact.rotation.x += ((0.23 - pointer.y * 0.34) - artifact.rotation.x) * 0.032;
          marker.position.x = -0.4 + Math.sin(elapsed * 1.35) * 0.42;
          marker.rotation.set(elapsed * 1.7, elapsed * 1.1, 0);
          halo.rotation.z = elapsed * 0.08;
          if (isVisible && !document.hidden) renderer?.render(scene, camera);
          animationFrame = window.requestAnimationFrame(render);
        };

        if (!disposed) {
          setWebglActive(true);
          render();
        }

        cleanUp = () => {
          window.cancelAnimationFrame(animationFrame);
          mount.removeEventListener("pointermove", onPointerMove);
          mount.removeEventListener("pointerleave", onPointerLeave);
          mount.removeEventListener("pointercancel", onPointerLeave);
          resizeObserver?.disconnect();
          visibilityObserver?.disconnect();
          window.removeEventListener("resize", resize);
          scene.traverse((object) => {
            const renderable = object as import("three").Mesh;
            renderable.geometry?.dispose?.();
            const materials = Array.isArray(renderable.material) ? renderable.material : [renderable.material];
            materials.forEach((material) => material?.dispose?.());
          });
          renderer?.dispose();
          renderer?.domElement.remove();
        };
      } catch {
        if (!disposed) setWebglActive(false);
        renderer?.dispose();
      }
    });

    return () => {
      disposed = true;
      cleanUp();
    };
  }, [reducedMotion]);

  return (
    <div className={`webgl-artifact ${webglActive ? "is-webgl-active" : ""}`} aria-label="Interactive three-dimensional system artifact">
      <img src="/manus-storage/marcus-hero-terminal_7afb372a.jpg" alt="" aria-hidden="true" className="webgl-fallback" onError={(event) => { event.currentTarget.style.display = "none"; }} />
      <div ref={mountRef} className="webgl-canvas" aria-hidden="true" />
      <div className="artifact-status" aria-hidden="true">
        <p>WebGL / {webglActive ? "interactive" : "static artifact"}</p>
        <p>{reducedMotion ? "motion paused" : "pointer reactive"}</p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function MemberCard({ member }) {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);

  const isExpanded = hovered || tapped;

  const handleTap = () => setTapped((prev) => !prev);

  return (
    <div
      className="w-56 flex-shrink-0"
      style={{ height: "300px", overflow: "visible" }}
    >
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={handleTap}
        animate={{
          y: isExpanded ? -12 : 0,
          scale: isExpanded ? 1.07 : 1,
          borderColor: isExpanded ? member.accent : "rgba(255,255,255,0.07)",
          boxShadow: isExpanded
            ? `0 0 32px ${member.accent}55, 0 0 80px ${member.accent}22, 0 24px 48px rgba(0,0,0,0.6)`
            : "0 0 0px transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="card flex flex-col items-center text-center rounded-2xl p-7 cursor-pointer w-full"
        style={{
          position: "relative",
          zIndex: isExpanded ? 50 : 1,
          minHeight: "100%",
          border: "1.5px solid rgba(255,255,255,0.07)",
          transformOrigin: "center top",
        }}
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                inset: -1.5,
                borderRadius: 16,
                background: `linear-gradient(120deg, transparent 35%, ${member.accent}28 50%, transparent 65%)`,
                backgroundSize: "200% 100%",
                animation: "shimmer 4s infinite linear",
                pointerEvents: "none",
                zIndex: -1,
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          animate={{
            borderColor: isExpanded
              ? member.accent + "66"
              : "rgba(255,255,255,0.08)",
            boxShadow: isExpanded ? `0 0 18px ${member.accent}55` : "none",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-4 icon-box flex-shrink-0"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {member.icon}
        </motion.div>

        <p className="text-white font-bold text-base leading-snug">
          {member.name}
        </p>
        <p
          className="text-sm mt-1 mb-2"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          {member.position}
        </p>

        <span
          className="text-xs font-bold tracking-wider font-mono px-3 py-1 rounded-md"
          style={{
            color: member.accent,
            backgroundColor: member.accent + "1a",
          }}
        >
          {member.abbr}
        </span>
        <p
          className="text-xs mt-1 mb-3"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          {member.chapter}
        </p>

        <div className="relative w-full mb-4">
          <motion.div
            animate={{ maxHeight: isExpanded ? 160 : 18 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            style={{ overflow: "hidden" }}
          >
            <motion.p
              animate={{
                color: isExpanded
                  ? "rgba(255,255,255,0.75)"
                  : "rgba(255,255,255,0.35)",
              }}
              transition={{ duration: 0.25 }}
              className="text-xs leading-relaxed"
            >
              {member.description}
            </motion.p>
          </motion.div>

          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "14px",
                  background:
                    "linear-gradient(to bottom, transparent, #12121a)",
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="flex gap-2 flex-wrap justify-center mb-3"
            >
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {member.domain}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: member.accent + "15",
                  color: member.accent,
                }}
              >
                {member.chapter}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          animate={{
            color: isExpanded ? member.accent : "rgba(255,255,255,0.25)",
          }}
          transition={{ duration: 0.2 }}
          className="text-xs font-medium flex items-center gap-1 mt-auto"
        >
          View Profile <span>→</span>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default MemberCard;

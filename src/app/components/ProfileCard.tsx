"use client";
import React from "react";
import { motion } from "framer-motion";

export function ProfileCard() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -1000, right: 0, top: -800, bottom: 0 }}
      dragElastic={0.15}
      whileDrag={{ scale: 1.03, cursor: "grabbing" }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        zIndex: 300,
        width: "300px",
        borderRadius: "20px",
        padding: "18px",
        color: "white",
        fontFamily: "Inter, sans-serif",
        cursor: "grab",
        userSelect: "none",

        // 🔥 Modern glass look
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px"
      }}>
        <span style={{
          fontSize: "11px",
          letterSpacing: "0.12em",
          opacity: 0.6
        }}>
          PROFILE
        </span>

        <div style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#4ADE80", // green status dot
          boxShadow: "0 0 10px #4ADE80"
        }} />
      </div>

      {/* Profile */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "14px"
      }}>
        {/* Avatar */}
        <div style={{
          width: "52px",
          height: "52px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "16px"
        }}>
          YN
        </div>

        <div>
          <h3 style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: 600
          }}>
            Your Name
          </h3>
          <p style={{
            margin: 0,
            fontSize: "12px",
            opacity: 0.6
          }}>
            Creative Developer
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: "1px",
        background: "rgba(255,255,255,0.1)",
        margin: "16px 0"
      }} />

      {/* Info */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "11px",
        opacity: 0.7
      }}>
        <span>Status</span>
        <span style={{ color: "#4ADE80" }}>Active</span>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "11px",
        opacity: 0.7,
        marginTop: "6px"
      }}>
        <span>Access</span>
        <span>Granted</span>
      </div>
    </motion.div>
  );
}
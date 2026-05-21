"use client";

import Image from "next/image";
import { useId } from "react";
import { getTeamLogo } from "@/constants/teamImages";
import { getTeamBadgeStyle } from "@/constants/teamStyles";
import type { TeamBadgeStyle } from "@/types/teamBadge";

interface TeamBadgeProps {
  teamName: string;
  size?: number;
  className?: string;
}

export function TeamBadge({ teamName, size = 44, className = "" }: TeamBadgeProps) {
  const logo = getTeamLogo(teamName, size);

  if (logo) {
    return (
      <Image
        src={logo.src}
        alt={`Logo oficial de ${teamName}`}
        width={logo.width}
        height={logo.height}
        unoptimized
        className={`shrink-0 bg-transparent object-contain drop-shadow-sm ${className}`}
        style={{ width: logo.width, height: logo.height, maxHeight: size * 1.15 }}
      />
    );
  }

  const style = getTeamBadgeStyle(teamName);

  if (style.variant === "crown-circle") {
    return (
      <CrownCircleBadge
        teamName={teamName}
        style={style}
        size={size}
        className={className}
      />
    );
  }

  if (style.variant === "striped-shield") {
    return (
      <StripedShieldBadge
        teamName={teamName}
        style={style}
        size={size}
        className={className}
      />
    );
  }

  if (style.variant === "psg-circle") {
    return (
      <PsgCircleBadge
        teamName={teamName}
        style={style}
        size={size}
        className={className}
      />
    );
  }

  return (
    <ShieldBadge
      teamName={teamName}
      style={style}
      size={size}
      className={className}
    />
  );
}

function CrownCircleBadge({
  teamName,
  style,
  size,
  className,
}: {
  teamName: string;
  style: TeamBadgeStyle;
  size: number;
  className: string;
}) {
  const uid = useId();
  const gold = style.secondary ?? "#C9A227";
  const goldDark = "#9A7B1A";
  const white = style.primary;
  const blue = style.accent ?? "#1E3A8A";
  const blueDark = "#152E6B";
  const { initials, textColor } = style;

  const fontSize =
    initials.length >= 3 ? 11 : initials.length === 2 ? 13 : 15;

  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 64 76"
      role="img"
      aria-label={`Escudo genérico de ${teamName}`}
      className={`shrink-0 drop-shadow-sm ${className}`}
    >
      {/* Coroa genérica (não é o emblema oficial) */}
      <g transform="translate(0, 1)">
        <path
          d="M32 3 L37 11 H43 L40 17 L44 23 H20 L24 17 L21 11 H27 Z"
          fill={gold}
          stroke={goldDark}
          strokeWidth="0.8"
        />
        <rect x="19" y="20" width="26" height="3" rx="1" fill="#B91C1C" opacity="0.85" />
        <circle cx="32" cy="11" r="1.5" fill={goldDark} />
        <circle cx="26" cy="13" r="1.2" fill={goldDark} />
        <circle cx="38" cy="13" r="1.2" fill={goldDark} />
      </g>

      {/* Círculo com borda dourada */}
      <defs>
        <clipPath id={`circle-clip${uid}`}>
          <circle cx="32" cy="46" r="21" />
        </clipPath>
      </defs>

      <circle
        cx="32"
        cy="46"
        r="24"
        fill={white}
        stroke={gold}
        strokeWidth="3"
      />

      {/* Faixa diagonal azul (genérica, inspirada no visual realista) */}
      <g clipPath={`url(#circle-clip${uid})`}>
        <path
          d="M8 52 L24 26 L56 30 L40 58 Z"
          fill={blue}
        />
        <path
          d="M32 28 L56 30 L40 58 L24 26 Z"
          fill={blueDark}
          opacity="0.25"
        />
      </g>

      {/* Iniciais */}
      <text
        x="32"
        y="48"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textColor}
        fontSize={fontSize}
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.04em"
      >
        {initials}
      </text>
    </svg>
  );
}

function PsgCircleBadge({
  teamName,
  style,
  size,
  className,
}: {
  teamName: string;
  style: TeamBadgeStyle;
  size: number;
  className: string;
}) {
  const navy = style.primary;
  const red = style.secondary ?? "#DA291C";
  const gold = style.accent ?? "#D4AF37";
  const white = "#FFFFFF";
  const { initials } = style;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={`Escudo genérico de ${teamName}`}
      className={`shrink-0 drop-shadow-sm ${className}`}
    >
      {/* Círculo azul marinho */}
      <circle cx="32" cy="32" r="28" fill={navy} stroke={white} strokeWidth="2.5" />

      {/* Anel interno branco */}
      <circle
        cx="32"
        cy="32"
        r="22"
        fill="none"
        stroke={white}
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* Iniciais no topo */}
      <text
        x="32"
        y="18"
        textAnchor="middle"
        fill={white}
        fontSize="9"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.12em"
      >
        {initials}
      </text>

      {/* Torre genérica (silhueta geométrica, não é a Torre Eiffel oficial) */}
      <path d="M32 22 L26 44 H38 Z" fill={red} />
      <line x1="27" y1="32" x2="37" y2="32" stroke={white} strokeWidth="1.2" opacity="0.7" />
      <line x1="28" y1="36" x2="36" y2="36" stroke={white} strokeWidth="1.2" opacity="0.7" />
      <line x1="29" y1="40" x2="35" y2="40" stroke={white} strokeWidth="1.2" opacity="0.7" />

      {/* Flor de lis estilizada (genérica) */}
      <g fill={gold} transform="translate(32, 48)">
        <ellipse cx="0" cy="-2" rx="2" ry="3.5" />
        <ellipse cx="-2.5" cy="1" rx="2" ry="3" transform="rotate(-35)" />
        <ellipse cx="2.5" cy="1" rx="2" ry="3" transform="rotate(35)" />
        <rect x="-0.8" y="2" width="1.6" height="4" rx="0.4" fill={gold} />
      </g>
    </svg>
  );
}

const SHIELD_OUTLINE =
  "M32 5 L54 11 V46 C54 57 44 66 32 70 C20 66 10 57 10 46 V11 Z";

const SHIELD_INNER =
  "M32 9 L50 14 V44 C50 53 42 62 32 64 C22 62 14 53 14 44 V14 Z";

function StripedShieldBadge({
  teamName,
  style,
  size,
  className,
}: {
  teamName: string;
  style: TeamBadgeStyle;
  size: number;
  className: string;
}) {
  const uid = useId();
  const redL = style.primary;
  const redR = "#C41230";
  const whiteL = style.secondary ?? "#FFFFFF";
  const whiteR = "#E8E8E8";
  const navyL = style.accent ?? "#1A237E";
  const navyR = "#0D1B5E";
  const goldL = "#F4C430";
  const goldR = "#D4A017";
  const { initials, textColor } = style;

  const stripeXs = [14, 19, 24, 29, 34, 39, 44];
  const colorsLeft = [redL, whiteL, redL, whiteL, redL, whiteL, redL];
  const colorsRight = [redR, whiteR, redR, whiteR, redR, whiteR, redR];

  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 64 74"
      role="img"
      aria-label={`Escudo genérico de ${teamName}`}
      className={`shrink-0 drop-shadow-sm ${className}`}
    >
      <defs>
        <clipPath id={`inner${uid}`}>
          <path d={SHIELD_INNER} />
        </clipPath>
        <clipPath id={`left${uid}`}>
          <rect x="0" y="0" width="32" height="74" />
        </clipPath>
        <clipPath id={`right${uid}`}>
          <rect x="32" y="0" width="32" height="74" />
        </clipPath>
      </defs>

      {/* Listras verticais */}
      <g clipPath={`url(#inner${uid})`}>
        <g clipPath={`url(#left${uid})`}>
          {stripeXs.map((x, i) => (
            <rect
              key={`l-${i}`}
              x={x}
              y="12"
              width={i < stripeXs.length - 1 ? stripeXs[i + 1] - x : 50 - x}
              height="54"
              fill={colorsLeft[i]}
            />
          ))}
        </g>
        <g clipPath={`url(#right${uid})`}>
          {stripeXs.map((x, i) => (
            <rect
              key={`r-${i}`}
              x={x}
              y="12"
              width={i < stripeXs.length - 1 ? stripeXs[i + 1] - x : 50 - x}
              height="54"
              fill={colorsRight[i]}
            />
          ))}
        </g>

        {/* Triângulo superior esquerdo */}
        <g clipPath={`url(#left${uid})`}>
          <path
            d="M14 14 L32 14 L14 32 Z"
            fill={whiteL}
            stroke={navyL}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </g>
        <g clipPath={`url(#right${uid})`}>
          <path
            d="M14 14 L32 14 L14 32 Z"
            fill={whiteR}
            stroke={navyR}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </g>
      </g>

      {/* Dobra central */}
      <line
        x1="32"
        y1="10"
        x2="32"
        y2="66"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="0.75"
      />

      {/* Borda dourada */}
      <path
        d={SHIELD_OUTLINE}
        fill="none"
        stroke={goldL}
        strokeWidth="3"
        clipPath={`url(#left${uid})`}
      />
      <path
        d={SHIELD_OUTLINE}
        fill="none"
        stroke={goldR}
        strokeWidth="3"
        clipPath={`url(#right${uid})`}
      />

      {/* Iniciais */}
      <text
        x="32"
        y="42"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textColor}
        fontSize={12}
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.06em"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="0.4"
        paintOrder="stroke fill"
      >
        {initials}
      </text>
    </svg>
  );
}

function ShieldBadge({
  teamName,
  style,
  size,
  className,
}: {
  teamName: string;
  style: TeamBadgeStyle;
  size: number;
  className: string;
}) {
  const uid = useId();
  const shieldId = `shield${uid}`;
  const shineId = `shine${uid}`;

  const { initials, primary, secondary, textColor } = style;

  const fontSize =
    initials.length >= 3 ? size * 0.26 : initials.length === 2 ? size * 0.32 : size * 0.38;

  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 64 74"
      role="img"
      aria-label={`Escudo genérico de ${teamName}`}
      className={`shrink-0 drop-shadow-sm ${className}`}
    >
      <defs>
        <linearGradient id={shieldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primary} />
          <stop offset="100%" stopColor={secondary ?? primary} />
        </linearGradient>
        <linearGradient id={shineId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <path
        d="M32 4 L54 11 V36 C54 52 44 64 32 70 C20 64 10 52 10 36 V11 Z"
        fill={`url(#${shieldId})`}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
      />

      {secondary && (
        <path
          d="M32 4 L54 11 V22 L10 22 V11 Z"
          fill={secondary}
          opacity="0.55"
        />
      )}

      <path
        d="M32 4 L54 11 V36 C54 52 44 64 32 70 C20 64 10 52 10 36 V11 Z"
        fill={`url(#${shineId})`}
      />

      <path
        d="M32 8 L50 14 V35 C50 48 42 58 32 64 C22 58 14 48 14 35 V14 Z"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
      />

      <text
        x="32"
        y="40"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textColor}
        fontSize={fontSize}
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        letterSpacing="-0.02em"
      >
        {initials}
      </text>
    </svg>
  );
}

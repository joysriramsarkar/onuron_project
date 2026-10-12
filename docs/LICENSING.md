# Licensing Policy

**Last Updated:** 2026-10-12
**Status:** Ecosystem-wide policy. Applies to every repository in the
NilLang / Onuron ecosystem.

---

## 1. The rule

**All project-owned components are licensed under the GNU Affero General Public
License v3.0 (AGPL-3.0).**

| Repository | License | Notes |
|------------|---------|-------|
| `nilLang` | AGPL-3.0 | Canonical language implementation |
| `onuronOS` | AGPL-3.0 | Relicensed from GPL-3.0 (GPLv3 → AGPLv3 is permitted) |
| `onuron_project` | AGPL-3.0 | Store, docs, ecosystem meta |
| `alap-framework` | MIT | See §3 — MIT carve-out |
| `nilos-emulator` | MIT | See §3 — MIT carve-out |

Store app manifests published from this project carry the same `AGPL-3.0`
value unless an app is explicitly third-party. The Terminal is part of
`nilshell` inside `onuronOS`; there is **no separate terminal repository**.

---

## 2. What AGPL-3.0 actually means

- AGPL-3.0 **does not prohibit commercial use or sale.** Anyone may sell the
  software (or a service built on it) as long as they comply with the licence.
- The strong copyleft means: if you distribute the software, or **offer it to
  users over a network**, you must make the **corresponding source code**
  available to those users under the same licence.
- Derivative works must remain under AGPL-3.0.

So the guarantee is *freedom + source availability*, **not** "no commercial
resale". If the goal were to forbid commercial resale outright, AGPL-3.0 alone
would not achieve it — the alternatives are described in §4.

---

## 3. MIT carve-out (`alap-framework`, `nilos-emulator`)

These two repositories were published under the **MIT** licence. Their
`LICENSE` files stay MIT. This is deliberate:

- A licence already granted for published versions **cannot be revoked** by
  later adding a different `LICENSE` file. Past MIT releases remain MIT.
- New contributions to those repositories are accepted under MIT unless the
  maintainer changes the licence going forward (with the irreversible history
  documented).

If these components are later folded into the canonical AGPL-3.0 codebase, the
*fold-in* (new code) can be AGPL-3.0 while the historical MIT code keeps its
existing permissions.

---

## 4. If the policy ever changes

Record any change here first, then apply it repo by repo. Options, with honest
trade-offs:

| Option | Blocks commercial resale? | Still "open source"? |
|--------|---------------------------|----------------------|
| AGPL-3.0 (current) | No | Yes |
| Source-Available, non-commercial | Yes (contractually) | **No** |
| Dual-licence (AGPL-3.0 + paid commercial) | No (but offers a paid closed path) | Yes (AGPL side) |

Choosing a non-commercial term would mean the project is **no longer
open-source** in the OSI sense, and that must be stated plainly wherever the
project is described.

---

## 5. Contribution & ownership

- Contributions are accepted under the repository's `LICENSE`.
- For any future dual-licensing, the maintainer would need the rights to
  relicense all contributions (e.g. a CLA). That is **not** in place today, so
  dual-licensing is not currently possible without going back to contributors.

---

## References

- [Roadmap & release gates](./ROADMAP.md)
- [Ecosystem Maturity Map](./ECOSYSTEM_MATURITY.md)
- canonical LICENSE files in each repository root

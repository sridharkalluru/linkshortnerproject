---
description: Read this file to understand the data fetching strategy for the project.
---

# Data Fetching Guidelines

This document outlines the data fetching strategy for the project, including best practices and patterns to follow when retrieving data from APIs or databases.

## Table of Contents

- [Overview](#overview)
- [Fetching Data methods](#fetching-data-methods)

## Overview

The project uses ALWAYS a server-side only for data fetching NEVER use client-side data fetching. All data fetching should be done in server components or API routes to ensure security and performance.

## Fetching Data methods

AWLAYS use helper functions in /data directory for data fetching to ensure consistency and reusability. NEVER user direct server-side fetching in components.

ALL helper fucntions in the /data disretory should use Drizzle ORM for database interactions.

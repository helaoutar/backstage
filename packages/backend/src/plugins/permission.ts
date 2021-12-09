/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { IdentityClient } from '@backstage/plugin-auth-backend';
import { createRouter } from '@backstage/plugin-permission-backend';
import { SimplePermissionPolicy } from '@backstage/plugin-permission-policy-simple';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const { logger, discovery } = env;
  return await createRouter({
    logger,
    discovery,
    policy: new SimplePermissionPolicy(),
    identity: new IdentityClient({
      discovery,
      issuer: await discovery.getExternalBaseUrl('auth'),
    }),
  });
}
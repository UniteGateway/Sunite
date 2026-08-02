import { Controller, Get, Post, Body } from '@nestjs/common';
import { DeveloperPlatformService } from './developer-platform.service';
import {
  RegisterDeveloperDto,
  CreateApiKeyDto,
  CreatePluginDto,
  CreateMarketplaceAppDto,
} from './developer-platform.dto';

@Controller()
export class DeveloperPlatformController {
  constructor(private readonly devService: DeveloperPlatformService) {}

  // 1. Register Developer Organization
  @Post('api/v1/developers/register')
  async registerDeveloper(@Body() dto: RegisterDeveloperDto) {
    return this.devService.registerDeveloper(dto);
  }

  // 2. Generate API Key
  @Post('api/v1/developers/api-key')
  async createApiKey(@Body() dto: CreateApiKeyDto) {
    return this.devService.createApiKey(dto);
  }

  // 3. Get Developer Registered Apps & Extensions
  @Get('api/v1/developers/apps')
  async getDeveloperApps() {
    return this.devService.getDeveloperApps();
  }

  // 4. Register / Install Plugin Extension
  @Post('api/v1/plugins')
  async createPlugin(@Body() dto: CreatePluginDto) {
    return this.devService.createPlugin(dto);
  }

  // 5. Get Installed Plugins
  @Get('api/v1/plugins')
  async getPlugins() {
    return this.devService.getPlugins();
  }

  // 6. Publish App to Marketplace
  @Post('api/v1/marketplace/apps')
  async createMarketplaceApp(@Body() dto: CreateMarketplaceAppDto) {
    return this.devService.createMarketplaceApp(dto);
  }

  // 7. Get Marketplace Directory & Categories
  @Get('api/v1/marketplace')
  async getMarketplace() {
    return this.devService.getMarketplace();
  }

  // 8. Public API Platform Catalog
  @Get('api/v1/apis')
  async getPublicApis() {
    return this.devService.getPublicApis();
  }
}

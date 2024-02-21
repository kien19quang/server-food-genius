import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class FeaturedFilter {
  @ApiProperty()
  @IsOptional()
  categoryId?: string;
}